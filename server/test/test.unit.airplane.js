var World = require('../world');
var Utils = require('../../shared/utils.js');
var Config = require('../../shared/config.js');

exports.testAirplaneWhereAttack= function(test) {
    var world = new World();
    var command = {
        type: 'addUnit',
        params: {
            type: 'airplane',
            location: [5,5]
        }
    };
    var airplane = world[command.type](world.players[0], command);
    airplane.setWhereAttack();
    test.ok(airplane.whereCouldAttack.length == 0, 'torpedo not in attack mode could attack, zero expected');
    var command = {
        type: 'addUnit',
        params: {
            type: 'aircraftCarrier',
            location: [5,4]
        }
    };
    var aircraftCarrier = world[command.type](world.players[0], command);
    airplane.setWhereAttack();
    test.ok(airplane.whereCouldAttack.length == 13, 'incorrect length of where could attack, 14 expected');
    test.done();
};
