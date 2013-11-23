$(function() {

    for (var i = 0; i < 14; i++) {
        var row = $('<div/>', {
                'class': 'row'
            }).appendTo('.map');
        for (var j = 0; j < 14; j++) {
            $('<div/>', {
                'data-row': i,
                'data-col': j,
                'class': 'field'
            }).appendTo(row);
        }
    };

    var Game = function () {
        this.id = null;
        this.player = null;
        this.phase = null;
        this.units = null;
    };

    Game.prototype.update = function (snapshot) {
        this.id = snapshot.myId;
        this.player = snapshot.players[this.id];
        this.phase = snapshot.world.phase;
        this.units = [];
        console.log(this.player);
        this[snapshot.world.phase](snapshot);
    };

    Game.prototype.planning_phase = function (snapshot) {
        console.log('planning');
        var me = this;
        setTimeout(function () {
        }, 500);
    };

    var socket = io.connect(":" + LocalConfig.port);
    var game = new Game(socket);

    socket.on("update", function (snapshot) {
        console.log(snapshot);
        game.update(snapshot);
    });
});

