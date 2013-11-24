var World = require('../world');
var Config = require('../../shared/config.js');

exports.testMobCreation = function(test) {
    var world = new World();
    var airplane = world.addUnit(world.players[0], 'airplane', [2,2]);
    test.ok(world.players[0].units.length > 0, 'Airplane was not added');
    test.done();
};