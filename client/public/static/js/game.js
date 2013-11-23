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

    var Game = function (socket) {
        this.socket = socket;
        this.id = null;
        this.player = null;
        this.phase = null;
        this.units = null;
    };

    Game.prototype.send = function (t, params) {
        socket.emit("command", {
            type: t,
            params: params
        });
    };

    Game.prototype.update = function (snapshot) {
        this.id = snapshot.myId;
        this.player = snapshot.players[this.id];
        if (this.phase != snapshot.world.phase) {
            this.phase = snapshot.world.phase;
            this.units = [];
            console.log(this.player);
            this[this.phase](snapshot);
        }
    };

    Game.prototype.planning_phase = function (snapshot) {
        console.log('planning');
        var unitsToPlace = [];
        var from = this.player.homelandLocation == 'up' ? 0 : 9;
        var to = this.player.homelandLocation == 'up' ? 5 : 14;
        var fieldsToPlace = [];
        for (var i = from; i < to; i++) {
            for (var j = 0; j < 14; j++) {
                fieldsToPlace.push([i, j]);
            }
        }
        for (var v in this.player.unitsToPlace) {
            for (var i = 0; i < this.player.unitsToPlace[v]; i++) {
                unitsToPlace.push(v);
            }
        }
        var me = this;
        var f = function () {
            if (me.phase == 'planning_phase' && me.units.length < unitsToPlace.length) {
                var field = fieldsToPlace.splice(Math.floor(Math.random() * fieldsToPlace.length), 1)[0];
                me.placeUnit(unitsToPlace[me.units.length], field);
                setTimeout(f, 200);
            }
        };
        f();
    };

    Game.prototype.placeUnit = function (unit, place) {
        console.log(unit, place);
        this.units.push([unit, place]);
        this.send('place', { 'location': place, 'type': unit });
    };

    var socket = io.connect(":" + LocalConfig.port);
    var game = new Game(socket);

    socket.on("update", function (snapshot) {
        console.log(snapshot);
        game.update(snapshot);
    });
});

