var World = require('../world');
var Utils = require('../../shared/utils.js');
var Config = require('../../shared/config.js');

exports.testAirplaneWhereAttack= function(test) {
    var world = new World();
    var airplane = world.addUnit(world.players[0], 'airplane', [5,5]);
    airplane.setWhereAttack();
    test.ok(airplane.whereCouldAttack.length == 0, 'torpedo not in attack mode could attack, zero expected');
    var aircraftCarrier = world.addUnit(world.players[0], 'aircraftCarrier', [5,4]);
    airplane.setWhereAttack();
    test.ok(airplane.whereCouldAttack.length == 14, 'incorrect length of where could attack, 14 expected');
    test.done();
};
