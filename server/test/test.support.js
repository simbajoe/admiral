var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');

exports.testSupportGreen01 = function(test) {

    var map = [
        "+-----------------------------------------------+",
        "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
        "|---+-------------------------------------------|",
        "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|5  | .  .  .  .  .  .  .  .  2v 2v .  .  .  .  |",
        "|6  | .  .  .  .  .  .  .  1s 1s .  .  .  .  .  |",
        "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[0].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2v 2v .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  1s 1s .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "+-----------------------------------------------+"
    ];
    Util.checkWorld(test, world, map_expected, world.players[0].id, Config.SUPPORT_PHASE);

    test.done();
};

exports.testSupportGreen02 = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2mS.  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  1s 1s .  .  .  .  .  |",
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
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2mS.  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  1s 1s .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[0].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[0].id, [7, 6]);

    map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  1s 1s .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};

exports.testSupportGreen03 = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  1p .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  1p 1cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  2v 2v .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  2v .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, world.players[1].id, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, world.players[1].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  1p .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  1p 1cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  2v 2v .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  2v .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[1].id, [7, 6]);

    map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  1p .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  1p 1cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  2v 2v .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  2v .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[1].id, [7, 7]);

    map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  1p .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  1p 1cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  2v 2v .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  2v .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[0].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[0].id, [9, 5]);

    map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  1p .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  1p 1cS.  .  .  .  |",
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
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[0].id, Config.MOVE_PHASE);

    test.done();
};

exports.testSupportGreen04 = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2p 2p .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
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
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2p 2p .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[1].id, {skip: 1});

    test.done();
};

exports.testSupportGreen05 = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2b .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
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
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2b .  .  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[0].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[0].id, [8, 7]);

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2b .  .  .  .  .  |",
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
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};


exports.testBattleDraw = function(test) {

    var map = [
        "+-----------------------------------------------+",
        "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
        "|---+-------------------------------------------|",
        "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|5  | .  .  .  .  .  .  .  .  2s .  .  .  .  .  |",
        "|6  | .  .  .  .  .  .  .  .  1s .  .  .  .  .  |",
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
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
        "+-----------------------------------------------+",
        "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
        "|---+-------------------------------------------|",
        "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|5  | .  .  .  .  .  .  .  .  1s .  .  .  .  .  |",
        "|6  | .  .  .  .  .  .  .  .  2s .  .  .  .  .  |",
        "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
        "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
        "+-----------------------------------------------+"
    ];
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};

exports.testSupportGreen06 = function(test) {

    var map = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2p 2cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
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
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 6], to: [8, 5]});

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2p 2cS.  .  .  .  |",
    "|6  | .  .  .  .  .  .  .  .  1p .  .  .  .  .  |",
    "|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|9  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  1B 2B |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.SUPPORT_PHASE);
    Util.supportAndCheck(test, world, world.players[1].id, [9, 5]);

    var map_expected = [
    "+-----------------------------------------------+",
    "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
    "|---+-------------------------------------------|",
    "|0  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|1  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|2  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|3  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|4  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|5  | .  .  .  .  .  .  .  .  2p 2cS.  .  .  .  |",
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
    Util.skipBattleResultsPhase(test, world);
    Util.checkWorld(test, world, map_expected, world.players[1].id, Config.MOVE_PHASE);

    test.done();
};
