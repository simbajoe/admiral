var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');

exports.testVisibleUnits01 = function(test) {

    var map = [
        "+-----------------------------------------------+",
        "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
        "|---+-------------------------------------------|",
        "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|4  | .  .  .  .  .  .  1s .  .  .  .  .  .  .  |",
        "|5  | .  .  .  .  .  .  2b .  .  .  .  .  .  .  |",
        "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
        "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[0].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[0].id, {from: [6,4], to: [6,5]});
    var snapshot = world.getSnapshot(world.players[1].id);
    var typeWannaCheck = '';
    for (var i in snapshot.players[world.players[1].id].units) {
        var unit = snapshot.players[world.players[0].id].units[i];
        if (unit.type) {
            typeWannaCheck = unit.type;
            break;
        }
    }
    test.ok(typeWannaCheck == 'submarine', 'Not correct visible unit type');
    test.done();
};