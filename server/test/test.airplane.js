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
    console.log(data);
    var fromCell = world.cells.get(data.from);
    var toCell = world.cells.get(data.to);
    var fromUnit = fromCell.getObject();
    var toUnit = toCell.getObject();
    test.ok(
        fromUnit !== null && toUnit !== null,
        'Attack error: from: `' + JSON.stringify(data.from) + '`, to: `'
        + JSON.stringify(data.to) + '`'
    );
    world.makeAttack(data);
    var fromUnit2 = fromCell.getObject();
    var toUnit2 = toCell.getObject();
};

var checkObject = function (test, world, place, expectedUnit, expectedPlayer) {
    var cell = world.cells.get(place);
    var obj = null;
    var player = null;
    if (cell) {
        obj = cell.getObject();
        if (obj) {
            player = obj.owner.id;
            obj = obj.type;
        }
    }
    expectedPlayer = expectedPlayer ? expectedPlayer - 1 : null;
    test.ok(
        obj === expectedUnit && player === expectedPlayer,
        'Check object: place: `' + JSON.stringify(place) + '`, have: `'
        + obj + '`: `' + player + '`, expected: `' + expectedUnit + '`: `' + expectedPlayer + '`'
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

    moveAndCheck(test, world, Config.PLAYER1, [6, 5], [7, 5]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [0, 10], [0, 9]);
    attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    moveAndCheck(test, world, Config.PLAYER1, [8, 4], [8, 5]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [0, 9], [0, 8]);
    attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    moveAndCheck(test, world, Config.PLAYER1, [8, 3], [8, 4]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [0, 8], [1, 8]);
    attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    moveAndCheck(test, world, Config.PLAYER1, [3, 4], [3, 5]);
    attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    moveAndCheck(test, world, Config.PLAYER2, [7, 10], [7, 9]);
    console.log(Fixture.getMap(world));
    attackAndCheck(test, world, Config.PLAYER2, {from: [1, 8], to: [1, 2]});
    checkObject(test, world, [1, 8], null, null);
    checkObject(test, world, [1, 2], null, null);

    console.log(Fixture.getMap(world));

    test.done();
};

