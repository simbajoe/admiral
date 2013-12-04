$(function() {

    for (var y = 0; y < 14; y++) {
        var row = $('<div/>', {
                'class': 'row'
            }).appendTo('.map');
        for (var x = 0; x < 14; x++) {
            var field = $('<div/>', {
                'data-x': x,
                'data-y': y,
                'class': 'field'
            }).appendTo(row);
            $('<div/>', {
                'class': 'field_back'
            }).appendTo(field);
            $('<div/>', {
                'class': 'field_content'
            }).appendTo(field);
            $('<div/>', {
                'class': 'arrow arrow_left'
            }).appendTo(field);
            $('<div/>', {
                'class': 'arrow arrow_right'
            }).appendTo(field);
            $('<div/>', {
                'class': 'arrow arrow_up'
            }).appendTo(field);
            $('<div/>', {
                'class': 'arrow arrow_down'
            }).appendTo(field);
            $('<div/>', {
                'class': 'field_holder'
            }).appendTo(field);
        }
    };

    var Game = function (socket) {
        this.socket = socket;
        this.id = null;
        this.player = null;
        this.phase = null;
        this.units = null;

        this.unit_to_place = null;
        this.auto_planning = null;
        this.hovers = {};
    };

    Game.prototype.send = function (t, params) {
        socket.emit("command", {
            type: t,
            params: params
        });
    };

    Game.prototype.skip = function () {
        socket.emit("command", {
            type: 'skipTurn'
        });
    };

    Game.prototype.update = function (snapshot) {
        if (snapshot.type && snapshot.type == 'hover') {
            var field = snapshot.field;
            this.hovers[snapshot.player_id] = field;
            $('.field').removeClass('hovered');
            $('.field[data-x="' + field[0] + '"][data-y="' + field[1] + '"]').addClass('hovered');
            return;
        }
        console.log(snapshot);
        $('.field_content').html('').removeClass().addClass('field_content');
        $('.field').removeClass().addClass('field').unbind('click').removeClass('border')
                .removeData('from').removeData('whereCouldAttack').removeData('whereCanMove')
                .removeData('unit');
        for (var player_id in this.hovers) {
            var field = this.hovers[player_id];
            $('.field[data-x="' + field[0] + '"][data-y="' + field[1] + '"]').addClass('hovered');
        }
        $('body').unbind('keypress');
        $('.hud').html('');
        $('.arrow').removeClass('visible');
        this.id = snapshot.myId;
        this.player = snapshot.players[this.id];
        this.phase = snapshot.world.phase;
        for (var i in snapshot.players) {
            var player = snapshot.players[i];
            for (var v in snapshot.players[i].units) {
                var unit = snapshot.players[i].units[v];
                if (unit.previousLocation) {
                    this.addArrow(unit.previousLocation, unit.location);
                }
                $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"]')
                    .addClass(unit.isAlive ? 'alive' : 'dead')
                    .addClass(unit.wasInBattle ? 'in_battle border' : 'not_in_battle')
                    .addClass(snapshot.players[i].id == this.id ? 'my' : 'opponent')
                $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"] .field_content')
                    .addClass('unit')
                    .addClass(unit.type ? unit.type : 'unknownUnit')
                    .parents('.field').addClass('with_unit');
            }
        }
        this[this.phase](snapshot);
    };

    Game.prototype.addArrow = function (from, to) {
        var dx = to[0] - from[0];
        if (dx) {
            dx /= Math.abs(dx);
        }
        var dy = to[1] - from[1];
        if (dy) {
            dy /= Math.abs(dy);
        }
        while (from[0] != to[0] || from[1] != to[1]) {
            var el = null;
            if (dx) {
                if (dx > 0) {
                    el = $('.field[data-x="' + from[0] + '"][data-y="' + from[1] + '"] .arrow_right');
                } else {
                    el = $('.field[data-x="' + from[0] + '"][data-y="' + from[1] + '"] .arrow_left');
                }
            } else if (dy) {
                if (dy > 0) {
                    el = $('.field[data-x="' + from[0] + '"][data-y="' + from[1] + '"] .arrow_down');
                } else {
                    el = $('.field[data-x="' + from[0] + '"][data-y="' + from[1] + '"] .arrow_up');
                }
            }
            el.addClass('visible');
            from[0] += dx;
            from[1] += dy;
        }
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

    Game.prototype.planning_phase = function (snapshot) {
        if (this.auto_planning) {
            this.planning_phase_auto(snapshot);
            return;
        }
        var me = this;
        $('.hud').append($('<div/>').addClass('hud_unit').addClass('auto').html('АВТО').click(
            function () {
                me.auto_planning = true;
                me.planning_phase_auto(snapshot);
                return;
            }
        ));
        $('.field').addClass('planning');
        $('.field.with_unit').addClass('can_move');
        for (var v in this.player.unitsToPlace) {
            if (this.player.unitsToPlace[v] > 0) {
                var unit = $('<div/>');
                unit.addClass('hud_unit')
                    .addClass(v)
                    .data('unit', v)
                    .html(this.player.unitsToPlace[v] + 'x');
                unit.click(function () {
                    me.unit_to_place = $(this).data('unit');
                    $('hud_unit').removeClass('active');
                    $(this).addClass('active');
                    $('.field').unbind('click').removeClass('place');
                    for (var f in me.player.freeCells) {
                        var cell = me.player.freeCells[f];
                        $('.field[data-x="' + cell[0] + '"][data-y="' + cell[1] + '"]')
                            .addClass('place')
                            .data('unit', $(this).data('unit'))
                            .click(function () {
                                me.send('addUnit', { 'location': [$(this).data('x'), $(this).data('y')], 'type': $(this).data('unit') });
                            });
                    }
                });
                $('.hud').append(unit);
                if (v == this.unit_to_place) {
                    unit.click();
                }
            }
        }
        for (var v in snapshot.players[this.id].units) {
            var unit = snapshot.players[this.id].units[v];
            $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"]')
                .addClass('displace')
                .click(function () {
                    me.send('displaceUnit', { 'target': [$(this).data('x'), $(this).data('y')] });
                });
        }
    };

    Game.prototype.planning_phase_auto = function (snapshot) {
        $('.field.with_unit').addClass('can_move');
        var unit = null;
        for (var v in this.player.unitsToPlace) {
            if (this.player.unitsToPlace[v] > 0) {
                unit = v;
                break;
            }
        }
        var voidFields = this.player.freeCells;
        if (unit) {
            var field = voidFields.splice(Math.floor(Math.random() * voidFields.length), 1)[0];
            this.placeUnit(unit, field);
        }
    };

    Game.prototype.move_phase = function (snapshot) {
        if (snapshot.world.currentPlayerId != this.id) {
            return;
        }
        var me = this;
        for (var v in this.player.units) {
            var unit = this.player.units[v];
            if (unit.whereCanMove.length) {
                $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"]')
                    .addClass('can_move')
                    .data('whereCanMove', unit.whereCanMove)
                    .click(function () {
                        $('.field').removeClass('move_from').removeClass('border').removeClass('move_to').removeData('from');
                        $(this).addClass('move_from').addClass('border');
                        var whereCanMove = $(this).data('whereCanMove');
                        for (var i = 0; i < whereCanMove.length; i++) {
                            var p = whereCanMove[i];
                            $('.field[data-x="' + p[0] + '"][data-y="' + p[1] + '"]').addClass('move_to').addClass('border')
                                .data('from', [$(this).data('x'), $(this).data('y')])
                                .click(function () {
                                    me.send('moveUnit', { 'from': $(this).data('from'), 'to': [$(this).data('x'), $(this).data('y')] });
                                    $('.field').unbind('click');
                                });
                        }
                    });
            }
        }
    };

    Game.prototype.attack_phase = function (snapshot) {
        if (snapshot.world.currentPlayerId != this.id) {
            return;
        }
        var me = this;
        var skip = true;
        for (var v in this.player.units) {
            var unit = this.player.units[v];
            if (unit.whereCanAttack.length) {
                skip = false;
                $('.field[data-x="' + unit.location[0] + '"][data-y="' + unit.location[1] + '"]')
                    .addClass('can_move')
                    .data('whereCanMove', unit.whereCanAttack)
                    .data('whereCouldAttack', unit.whereCouldAttack)
                    .click(function () {
                        $('.field').removeClass('move_from').removeClass('move_to').removeClass('could_attack').removeClass('border').removeData('from');
                        var whereCouldAttack = $(this).data('whereCouldAttack');
                        for (var i = 0; i < whereCouldAttack.length; i++) {
                            var place = whereCouldAttack[i];
                            $('.field[data-x="' + place[0] + '"][data-y="' + place[1] + '"]')
                                .addClass('could_attack');
                        }
                        $(this).addClass('move_from').addClass('border');
                        var whereCanMove = $(this).data('whereCanMove');
                        for (var i = 0; i < whereCanMove.length; i++) {
                            var p = whereCanMove[i];
                            $('.field[data-x="' + p[0] + '"][data-y="' + p[1] + '"]').addClass('move_to').addClass('border')
                                .data('from', [$(this).data('x'), $(this).data('y')])
                                .click(function () {
                                    me.send('attackUnit', { 'from': $(this).data('from'), 'to': [$(this).data('x'), $(this).data('y')] });
                                    $('.field').unbind('click');
                                    $('body').unbind('keypress');
                                });
                        }
                    });
            }
        }
        if (skip) {
            me.skip();
            $('.field').unbind('click');
            $('body').unbind('keypress');
        } else {
            $("body").keypress(function(event) {
                // w
                if (event.charCode == 119) {
                    me.skip();
                    $('.field').unbind('click');
                    $('body').unbind('keypress');
                }
            });
        }
    };

    Game.prototype.support_phase = function (snapshot) {
        if (snapshot.world.currentPlayerId != this.id) {
            return;
        }
        if (!this.player.supportCells || !this.player.supportCells.length) {
            me.skip();
            $('.field').unbind('click');
            $('body').unbind('keypress');
        } else {
            $("body").keypress(function(event) {
                // w
                if (event.charCode == 119) {
                    me.skip();
                    $('.field').unbind('click');
                    $('body').unbind('keypress');
                }
            });
        }
        var me = this;
        for (var v in this.player.supportCells) {
            var place = this.player.supportCells[v];
            $('.field[data-x="' + place[0] + '"][data-y="' + place[1] + '"]')
                .addClass('can_move')
                .click(function () {
                    me.send('supportUnit', { 'target': [$(this).data('x'), $(this).data('y')] });
                    $('.field').unbind('click');
                    $('body').unbind('keypress');
                });
        }
    };

    Game.prototype.battle_results_phase = function (snapshot) {
        var me = this;
        var needToSkip = true;
        for (var i in snapshot.waitingForPlayerIds) {
            if (snapshot.waitingForPlayerIds[i] == this.id) {
                needToSkip = false;
                break;
            }
        }
        if (needToSkip) {
            $("body").keypress(function(event) {
                // w
                if (event.charCode == 119) {
                    me.skip();
                    $('body').unbind('keypress');
                }
            });
        }
    };

    Game.prototype.placeUnit = function (unit, place) {
        this.send('addUnit', { 'location': place, 'type': unit });
    };

    var socket = io.connect(":" + LocalConfig.port);
    var game = new Game(socket);

    $(".field").hover(function() {
        game.send('notifyHover', {target: [$(this).data('x'), $(this).data('y')]});
    });

    socket.on("update", function (snapshot) {
        //console.log(snapshot);
        game.update(snapshot);
    });
});

