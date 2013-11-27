var Config = require('../shared/config.js');

var unitDic = {
    aC: 'aircraftCarrier', // 1
    b : 'battleship', // 2
    c : 'cruiser', // 6
    fS: 'fireShip', // 1
    a : 'airplane', // 1
    B : 'MNB', // 2
    aB: 'atomicBomb', // 1
    r : 'raider', // 2
    m : 'mine', // 6
    d : 'destroyer', // 6
    fM: 'fixedMine', // 1
    cS: 'cruisingSubmarine', // 1
    p : 'patrol', // 6
    t : 'torpedo', // 6
    v : 'vedette', // 6
    mS: 'minesweeper', // 6
    s : 'submarine' // 6
};

var map_template_01 = [
"+-----------------------------------------------+",
"|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
"|---+-------------------------------------------|",
"|0  | aC .  mS b  s  s  B  .  .  .  s  s  p  p  |",
"|1  | a  d  mS m  b  v  v  s  t  v  t  .  B  p  |",
"|2  | d  m  mS m  d  t  t  d  s  v  r  .  .  p  |",
"|3  | m  mS mS mS .  m  d  cS v  c  .  r  v  p  |",
"|4  | c  c  c  fS .  fM m  d  t  c  c  aB t  p  |",
"|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|9  | aC .  mS b  s  s  B  .  .  .  s  s  p  p  |",
"|10 | a  d  mS m  b  v  v  s  t  v  t  .  B  p  |",
"|11 | d  m  mS m  d  t  t  d  s  v  r  .  .  p  |",
"|12 | m  mS mS mS .  m  d  cS v  c  .  r  v  p  |",
"|13 | c  c  c  fS .  fM m  d  t  c  c  aB t  p  |",
"+-----------------------------------------------+"
];

var map_template_02 = [
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

(function(exports){

    exports.loadSource = function (source, playerId1, playerId2) {
        var units = {};
        var p1 = [];
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 14; x++) {
                var u = source[y + 3].slice(x * 3 + 6, x * 3 + 9).trim();
                if (u in unitDic) {
                    p1.push([unitDic[u], [x, y]]);
                }
            }
        }
        units[playerId1] = p1;
        var p2 = [];
        for (var y = 9; y < 14; y++) {
            for (var x = 0; x < 14; x++) {
                var u = source[y + 3].slice(x * 3 + 6, x * 3 + 9).trim();
                if (u in unitDic) {
                    p2.push([unitDic[u], [x, y]]);
                }
            }
        }
        units[playerId2] = p2;
        return units;
    };

    exports.getMap = function (world) {
        var map = [
            "+-----------------------------------------------+",
            "|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
            "|---+-------------------------------------------|"
        ];
        var cells = world.cells;
        for (var y = 0; y < 14; y++) {
            var row = "|" + y;
            while (row.length < 4) {
                row += ' ';
            }
            row += '| ';
            for (var x = 0; x < 14; x++) {
                var unit = '.';
                var cell = cells.get([x, y]);
                if (cell) {
                    var u = cell.getObject();
                    if (u) {
                        for (var v in unitDic) {
                            if (unitDic[v] == u.type) {
                                unit = '' + u.owner.id + v;
                            }
                        }
                    }
                }
                while (unit.length < 3) {
                    unit += ' ';
                }
                row += unit;
            }
            row += '|';
            map.push(row);
        }
        map.push("+-----------------------------------------------+");
        return map;
    };

    exports.loadUnits = function (source, player1Id, player2Id) {
        var units = {};
        units[player1Id] = [];
        units[player2Id] = [];
        for (var y = 0; y < 14; y++) {
            for (var x = 0; x < 14; x++) {
                var u = source[y + 3].slice(x * 3 + 6, x * 3 + 9).trim();
                if (u != '.') {
                    var player = parseInt(u[0]);
                    u = u.slice(1);
                    units[player].push([unitDic[u], [x, y]]);
                }
            }
        }
        return units;
    };

    exports.setupWorld = function (test, world, map, currentTurn, phase) {
        var units = exports.loadUnits(map, world.players[0].id, world.players[1].id);
        for (var p in units) {
            var i = 0;
            for (var u in units[p]) {
                var unit = units[p][u];
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
        world.currentTurn = currentTurn;
        world.phase = phase;
    };

    exports.checkWorld = function (test, world, map, currentTurn, phase) {
        test.deepEqual(exports.getMap(world), map, "checkWorld: wrong map");
        test.equal(currentTurn, world.currentTurn, "checkWorld: wrong currentTurn");
        test.equal(phase, world.phase, "checkWorld: wrong phase");
    };

    var checkPhase = exports.checkPhase = function(test, world, phase) {
        test.ok(
            world.phase == phase,
            'Wrong phase: `' + world.phase + '`. Expected: `' + phase + '`'
        );
    };

    var checkCurrnetTurn = exports.checkCurrnetTurn = function(test, world, playerId) {
        test.ok(
            world.currentTurn == playerId,
            'Wrong player: `' + world.currentTurn + '`. Expected: `' + (playerId) + '`'
        );
    };

    var moveAndCheck = exports.moveAndCheck = function(test, world, playerId, from, to) {
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

    var attackAndCheck = exports.attackAndCheck = function(test, world, playerId, data) {
        checkPhase(test, world, Config.ATTACK_PHASE);
        checkCurrnetTurn(test, world, playerId);
        if (data.skip) {
            world.skipTurn(world.getPlayerById(playerId));
            return;
        }
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
    };

    var supportAndCheck = exports.supportAndCheck = function(test, world, playerId, target) {
        checkPhase(test, world, Config.SUPPORT_PHASE);
        checkCurrnetTurn(test, world, playerId);
        if (target.skip) {
            world.skipTurn(world.getPlayerById(playerId));
            return;
        }
        var cell = world.cells.get(target);
        var unit = cell.getObject();
        test.ok(
            unit !== null,
            'Support error: place: `' + JSON.stringify(target)+ '`'
        );
        world.makeSupport(target);
    };

    var checkObject = exports.checkObject = function (test, world, place, expectedUnit, expectedPlayer) {
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

})(typeof exports === 'undefined'? this['Util']={}: exports);

