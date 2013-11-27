var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');

exports.testMobCreation = function(test) {
    var world = new World();

    // PLANNING
    Util.checkPhase(test, world, Config.PLANNING_PHASE);

    var source = [
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

    var units = Util.loadSource(source);
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

    Util.moveAndCheck(test, world, Config.PLAYER1, [11, 4], [11, 5]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [0, 9], [1, 9]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER1, [6, 4], [6, 5]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [9, 10], [9, 8]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER1, [6, 5], [7, 5]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [0, 10], [0, 9]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER1, [8, 4], [8, 5]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [0, 9], [0, 8]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER1, [8, 3], [8, 4]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [0, 8], [1, 8]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER1, [3, 4], [3, 5]);
    Util.attackAndCheck(test, world, Config.PLAYER1, {skip: true});

    Util.moveAndCheck(test, world, Config.PLAYER2, [7, 10], [7, 9]);
    Util.attackAndCheck(test, world, Config.PLAYER2, {from: [1, 8], to: [1, 2]});
    Util.checkObject(test, world, [1, 8], null, null);
    Util.checkObject(test, world, [1, 2], null, null);

    /*console.log(Util.getMap(world));*/

    test.done();
};
