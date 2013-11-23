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
    if (world.players.length > 1) {
        return;
    }
    socket.player = world.addPlayer(socket);
    socket.on("disconnect", function () {
        world.removePlayer(socket.player);
    });
    socket.on("command", function (command) {
        updateGame();
    });
    socket.player.broadcast(worldHash);
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
    while (i--) {
        worldHash.myId = world.players[i].id;
        world.players[i].broadcast(worldHash);
    }
}
