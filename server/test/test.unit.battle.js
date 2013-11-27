var World = require('../world');
var Battle = require('../battle');
var Config = require('../../shared/config.js');

exports.testBattle = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'patrol', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var b = new Battle(unit1, unit2);
    test.ok(b.offender.fireValue == b.defender.fireValue, 'Not equal fire value of same group');
    test.ok(b.draw, 'Battle did not end in draw');
    var unit3 = world.addUnit(world.players[0], 'cruisingSubmarine', [0,1]);
    b.addUnit(unit3);
    test.ok(b.offender.fireValue < b.defender.fireValue, 'Not correct fire value patrol+cruisingSubmarine vs patrol');
    test.ok(b.winner.id == world.players[0].id, 'Incorrect winner of the game');
    test.done();
};


exports.testGetPossibleGroups = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'patrol', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var b = new Battle(unit1, unit2);
    var groups = b.defender.getPossibleGroups('submarine');
    test.ok(groups.length == 3, 'Incorrect number of groups for submarine');
    for (var i in groups) {
        for (var j in groups[i]) {
            test.ok(groups[i][j] == 'submarine', 'Incorrect unit type in groups with submarine');
        }
    }
    test.done();
};


exports.testCanHaveSupport = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'patrol', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var b = new Battle(unit1, unit2);
    test.ok(!b.defender.canHaveSupport([unit1]), 'Single unit can have support');
    var unit3 = world.addUnit(world.players[0], 'cruisingSubmarine', [0,1]);
    b.defender.addUnit(unit3);
    test.ok(b.defender.canHaveSupport([unit1, unit3]), 'Patrol can not have cruisingSubmarine support');
    test.done();
};

exports.testGetPlayerWhoCanSupport = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'cruisingSubmarine', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var unit3 = world.addUnit(world.players[0], 'patrol', [0,1]);
    var b = new Battle(unit1, unit2);
    test.ok(b.currentSupportPlayer, 'No support player');
    test.ok(b.currentSupportPlayer.id == world.players[0].id, 'Current support player incorrect');
    test.done();
};

exports.testAddUnit = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'cruisingSubmarine', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var unit3 = world.addUnit(world.players[0], 'patrol', [0,1]);
    var b = new Battle(unit1, unit2);
    b.addUnit(unit3);
    test.ok(b.winner.id == world.players[0].id, 'Not correct winner after support');
    test.done();
};