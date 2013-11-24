var World = require('../world');
var Battle = require('../battle');
var Config = require('../../shared/config.js');

exports.testBattle = function(test) {
    var world = new World();
    var unit1 = world.addUnit(world.players[0], 'patrol', [0,0]);
    var unit2 = world.addUnit(world.players[1], 'patrol', [1,0]);
    var b = new Battle(unit1, unit2, world);
    test.ok(b.offendersFireValue == b.defendersFireValue, 'Not equal fire value of same group');
    var unit3 = world.addUnit(world.players[0], 'cruisingSubmarine', [0,1]);
    b.addDefender(unit3);
    test.ok(b.offendersFireValue < b.defendersFireValue, 'Not correct fire value patrol+cruisingSubmarine vs patrol');
    test.done();
};

