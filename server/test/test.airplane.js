var World = require('../world');
var Config = require('../../shared/config.js');
var Fixture = require('./fixture.js');

exports.testMobCreation = function(test) {
    var world = new World();
    for (var p in Fixture.units) {
        var i = 0;
        for (var u in Fixture.units[p]) {
            var unit = Fixture.units[p][u];
            world.addUnit(world.players[p - 1], unit[0], unit[1]);
            i++;
            test.ok(
                    world.players[p - 1].units.length == i,
                    'Unit was not added: ' + JSON.stringify(unit)
                    + '. Have units: ' + world.players[p - 1].units.length
                    + '. Expected: ' + i
                    + '. Player: ' + p + '.'
                   );
        }
    }
    test.done();
};

