$(function() {

    for (var y = 0; y < 14; y++) {
        var row = $('<div/>', {
                'class': 'row'
            }).appendTo('.map');
        for (var x = 0; x < 14; x++) {
            $('<div/>', {
                'data-x': x,
                'data-y': y,
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
        this.phase = snapshot.world.phase;
        $('.field').html('');
        for (var v in this.player.units) {
            var unit = this.player.units[v];
            $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"]').html(unit.type);
        }
        console.log(this.phase, this.player);
        this[this.phase](snapshot);
    };

    Game.prototype.hasUnitHere = function (x, y) {
        for (var v in this.player.units) {
            var unit = this.player.units[v];
            if (unit.location[0] == x && unit.location[1] == y) {
                return true;
            }
        }
        return false;
    };

    Game.prototype.fieldsToPlace = function () {
        var from = this.player.homelandLocation == 'up' ? 0 : 9;
        var to = this.player.homelandLocation == 'up' ? 5 : 14;
        var fields = [];
        for (var y = from; y < to; y++) {
            for (var x = 0; x < 14; x++) {
                if (!this.hasUnitHere(x, y)) {
                    fields.push([x, y]);
                }
            }
        }
        return fields;
    };

    Game.prototype.planning_phase = function (snapshot) {
        var unit = null;
        for (var v in this.player.unitsToPlace) {
            if (this.player.unitsToPlace[v] > 0) {
                unit = v;
            }
        }
        var voidFields = this.fieldsToPlace();
        if (unit) {
            var field = voidFields.splice(Math.floor(Math.random() * voidFields.length), 1)[0];
            this.placeUnit(unit, field);
        }
    };

    Game.prototype.placeUnit = function (unit, place) {
        console.log(unit, place);
        this.send('place', { 'location': place, 'type': unit });
    };

    var socket = io.connect(":" + LocalConfig.port);
    var game = new Game(socket);

    socket.on("update", function (snapshot) {
        console.log(snapshot);
        game.update(snapshot);
    });
});

