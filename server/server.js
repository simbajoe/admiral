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
game();

io.sockets.on("connection", function (socket) {
    socket.player = world.addPlayer(socket);
    socket.on("disconnect", function () {
        world.removePlayer(socket.player);
    });
    socket.on("command", function (command) {
        if (command.type=="build") {
            world.addTower(socket.player, command);
        }
    });
    socket.player.broadcast(worldHash);
});


function game() {
    function getTime() {
        var time = process.hrtime();
        return (time[0] * 1e9 + time[1])/1e6;
    }
    var lastTime = getTime();
    loop();
    function loop() {
        var now = getTime();
        var elapsed = now - lastTime;
        lastTime = now;
        var t = 0;
        var dt;
        while (t < elapsed) {
            if (elapsed - t > Config.dtMax) {
                dt = Config.dtMax;
            } else {
                dt = elapsed - t;
            }
            t += dt;
            var typesToUpdate = ['spawners', 'towers', 'mobs', 'players'];
            for (var j in typesToUpdate) {
                i = world[typesToUpdate[j]].length;
                while (i--) {
                    world[typesToUpdate[j]][i].update(dt);
                }
            }
        }
        worldHash = world.getHash();
        worldHash.score = score;
        i = world.players.length;
        while (i--) {
            worldHash.myId = world.players[i].id;
            world.players[i].broadcast(worldHash);
        }
        if (world.winner) {
            score[world.winner] += 1;
            var playerSockets = [];
            i = world.players.length;
            while (i--) {
                playerSockets.push(world.players[i].socket);
            }
            world = new World();
            i = playerSockets.length;
            while (i--) {
                playerSockets[i].player = world.addPlayer(playerSockets[i]);;
            }
            worldHash = world.getHash();
            setTimeout(game, 3000);
            return;
        }
        setTimeout(loop, 100);
    }
}
