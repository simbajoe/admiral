var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');
var Utils = require('../../shared/utils.js');

exports.testAirplaneAgainstChargedTorpedo = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  1aC.  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  1a .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  2t .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  2v .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[0].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[0].id, {from: [6, 3], to: [6, 9]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  1aC.  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  2v .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};

exports.testAirplaneAgainstTorpedo = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  1c .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  1aC.  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  1a .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  2t .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  2c .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[0].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[0].id, {from: [6, 3], to: [6, 9]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  1c .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  1aC.  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  2c .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};


exports.testAirplaneNearBorder = function(test) {
    var map = [
        "+-----------------------------------------------+",
        "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
        "|---+-------------------------------------------|",
        "|0  | 2t .  .  .  .  1a 1aC.  .  .  .  .  .  2t |",
        "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|9  | .  .  .  .  .  2t 2t .  .  .  .  .  .  .  |",
        "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
        "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[0].id, Config.ATTACK_PHASE);
    var player1 = world.players[0];
    var hash = world.getSnapshot(player1);
    for (var i in hash.players[player1.id].units) {
        var unit = hash.players[player1.id].units[i];
        if (unit.type == 'airplane') {
            test.ok(Utils.findPointIndexInArr([0,0], unit.whereCanAttack) != -1, 'airlane where can attack point ' +
                '[0,0] not found');
            test.ok(Utils.findPointIndexInArr([13,0], unit.whereCanAttack) != -1, 'airlane where can attack point ' +
                '[13,0] not found');
            test.ok(Utils.findPointIndexInArr([6,9], unit.whereCanAttack) != -1, 'airlane where can attack point ' +
                '[6,9] not found');
            test.ok(Utils.findPointIndexInArr([5,9], unit.whereCanAttack) != -1, 'airlane where can attack point ' +
                '[5,9] not found');
        }
    }
    test.done();
};
