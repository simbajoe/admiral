var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');

exports.testAirplainAgainstChargedTorpedo = function(test) {

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
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, Config.PLAYER1, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, Config.PLAYER1, {from: [6, 3], to: [6, 9]});

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
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, Config.PLAYER2, Config.MOVE_PHASE);

    test.done();
};

exports.testAirplainAgainstTorpedo = function(test) {

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
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "+-----------------------------------------------+"
    ];

    var world = new World();

    Util.setupWorld(test, world, map, Config.PLAYER1, Config.ATTACK_PHASE);
    Util.attackAndCheck(test, world, Config.PLAYER1, {from: [6, 3], to: [6, 9]});

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
    "|10 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|11 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|12 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "|13 | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
    "+-----------------------------------------------+"
    ];

    Util.checkWorld(test, world, map_expected, Config.PLAYER2, Config.MOVE_PHASE);

    test.done();
};

