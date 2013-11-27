var Config = require('../shared/config.js');
var LocalConfig = require('../shared/config.local.js');
var World = require('./world.js');
var io = require("socket.io").listen(LocalConfig.port, {log: false});
io.set('browser client gzip', true);
io.set('browser client minification', true); // send minified client
io.set('browser client etag', true); // apply etag caching logic based on version number

var world = null;
var worldHash = {};
var i = 0;

world = new World();
worldHash = world.getHash();

io.sockets.on("connection", function (socket) {
    var player = world.getPlayerWithoutSocket();
    if (!player) {
        return;
    }
    socket.player = player;
    player.addSocket(socket);
    socket.on("disconnect", function () {
        socket.player.removeSocket();
    });
    socket.on("command", function (command) {
        var isSuccess = null;
        if (command.type == 'place') {
            isSuccess = world.addUnit(socket.player, command.params.type, command.params.location);
            if (isSuccess) {
                updateGame();
            }
        }
        if (command.type == 'move') {
            isSuccess = world.makeMove(command.params.from, command.params.to);
            if (isSuccess) {
                updateGame();
            }
        }
        if (command.type == 'attack') {
            isSuccess = world.makeAttack(command.params);
            if (isSuccess) {
                updateGame();
            }
        }
        if (command.type == 'support') {
            isSuccess = world.makeSupport(command.params.target);
            if (isSuccess) {
                updateGame();
            }
        }
    });
    updateGame();
});


function updateGame() {
    var i = 0;
    if (world.winner) {
        var playerSockets = [];
        i = world.players.length;
        while (i--) {
            playerSockets.push(world.players[i].socket);
        }
        world = new World();
        i = playerSockets.length;
        while (i--) {
            playerSockets[i].player = world.addPlayer(playerSockets[i]);
        }
        worldHash = world.getHash();
        return;
    }
    i = world.players.length;
    worldHash = world.getHash();
    while (i--) {
        worldHash.myId = world.players[i].id;
        world.players[i].broadcast(worldHash);
    }
}
