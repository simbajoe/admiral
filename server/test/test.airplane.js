var World = require('../world');
var Config = require('../../shared/config.js');
var Fixture = require('../fixture/scenario_01.js');

var checkPhase = function(test, world, phase) {
    test.ok(
        world.phase == phase,
        'Wrong phase: `' + world.phase + '`. Expected: `' + phase + '`'
        );
};

var checkCurrnetTurn = function(test, world, playerId) {
    test.ok(
        world.currentTurn == playerId - 1,
        'Wrong phase: `' + world.currentTurn + '`. Expected: `' + (playerId - 1) + '`'
        );
};

var moveAndCheck = function(test, world, playerId, from, to) {
    checkPhase(test, world, Config.MOVE_PHASE);
    checkCurrnetTurn(test, world, playerId);
    var fromCell = world.cells.get(from);
    var toCell = world.cells.get(to);
    var fromUnit = fromCell.getObject();
    var toUnit = toCell.getObject();
    world.makeMove(from, to);
    var fromUnit2 = fromCell.getObject();
    var toUnit2 = toCell.getObject();
    test.ok(
        fromUnit !== null && toUnit === null
        && fromUnit == toUnit2 && fromUnit2 === null,
        'Move error: from: `' + JSON.stringify(from) + '`, to: `'
        + JSON.stringify(to) + '`'
    );
};

var attackAndCheck = function(test, world, playerId, data) {
    checkPhase(test, world, Config.ATTACK_PHASE);
    checkCurrnetTurn(test, world, playerId);
    if (data.skip) {
        world.makeAttack(data);
        return;
    }
    var fromCell = world.cells.get(data.from);
    var toCell = world.cells.get(data.to);
    var fromUnit = fromCell.getObject();
    var toUnit = toCell.getObject();
    world.makeAttack(data);
    var fromUnit2 = fromCell.getObject();
    var toUnit2 = toCell.getObject();
    test.ok(
        fromUnit !== null && toUnit !== null,
        'Attack error: from: `' + JSON.stringify(from) + '`, to: `'
        + JSON.stringify(to) + '`'
    );
};

exports.testMobCreation = function(test) {
    var world = new World();

    // PLANNING
    checkPhase(test, world, Config.PLANNING_PHASE);

    var units = Fixture.loadSource();
    for (var p in units) {
        var i = 0;
        for (var u in units[p]) {
            var unit = units[p][u];
            world.addUnit(world.players[p], unit[0], unit[1]);
            i++;
            test.ok(
                    world.players[p].units.length == i,
                    'Unit was not added: ' + JSON.stringify(unit)
                    + '. Have units: ' + world.players[p].units.length
                    + '. Expected: ' + i
                    + '. Player: ' + p + '.'
                   );
        }
    }

    world.currentTurn = Config.PLAYER1 - 1;

    moveAndCheck(test, world, Config.PLAYER1, [11, 4], [11, 5]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [0, 9], [1, 9]);
    attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    moveAndCheck(test, world, Config.PLAYER1, [6, 4], [6, 5]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [9, 10], [9, 8]);
    attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    console.log(Fixture.getMap(world));

    test.done();
};

