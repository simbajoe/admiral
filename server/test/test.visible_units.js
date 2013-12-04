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
        "|13 | .  .  .  .  .  2c .  .  .  .  .  .  1B 2B |",
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

    var world = new World();

    Util.setupWorld(test, world, map, world.players[1].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[1].id, {from: [6,5], to: [6,4]});
    var snapshot = world.getSnapshot(world.players[1].id);
    var typeWannaCheck = '';
    for (var i in snapshot.players[world.players[0].id].units) {
        var unit = snapshot.players[world.players[0].id].units[i];
        if (unit.type) {
            typeWannaCheck = unit.type;
            break;
        }
    }
    test.ok(typeWannaCheck == 'submarine', 'Not correct visible unit type expected submarine, appeared ' + unit.type);
    Util.skipBattleResultsPhase(test,world);
    var snapshot = world.getSnapshot(world.players[1].id);
    test.ok(snapshot.world.phase == Config.MOVE_PHASE, 'Not correct phase after skip battle');
    for (var i in snapshot.players[world.players[0].id].units) {
        var unit = snapshot.players[world.players[0].id].units[i];
        if (unit.type || unit.wasInBattle) {
            test.ok(false, 'Unit visible on move phase');
            break;
        }
    }

    test.done();
};