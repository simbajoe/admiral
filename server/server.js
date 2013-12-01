var Config = require('../shared/config.js');
var LocalConfig = require('../shared/config.local.js');
var World = require('./world.js');
var io = require("socket.io").listen(LocalConfig.port, {log: false});
io.set('browser client gzip', true);
io.set('browser client minification', true); // send minified client
io.set('browser client etag', true); // apply etag caching logic based on version number

var world = null;
var i = 0;

world = new World();

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
        isSuccess = world[command.type](socket.player, command);
        if (isSuccess) {
            updateGame();
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
        return;
    }
    i = world.players.length;
    while (i--) {
        var worldHash = world.getSnapshot(world.players[i]);
        world.players[i].broadcast(worldHash);
    }
}
