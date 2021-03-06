var World = require('../world');
var Config = require('../../shared/config.js');
var Util = require('../test_util.js');

exports.testUnitsCreation = function(test) {
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

    var units = Util.loadSource(source, world.players[0].id, world.players[1].id);
    for (var p in units) {
        var i = 0;
        for (var u in units[p]) {
            var unit = units[p][u];
            var command = {
                type: 'addUnit',
                params: {
                    type: unit[0],
                    location: unit[1]
                }
            };
            world[command.type](world.getPlayerById(p), command);
            i++;
            test.ok(
                world.getPlayerById(p).units.length == i,
                    'Unit was not added: ' + JSON.stringify(unit)
                    + '. Have units: ' + world.getPlayerById(p).units.length
                    + '. Expected: ' + i
                    + '. Player: ' + p + '.'
                   );
        }
    }

    world.currentPlayerId = world.players[0].id;

    Util.moveAndCheck(test, world, world.players[0].id, [11, 4], [11, 5]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [0, 9], [1, 9]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [6, 4], [6, 5]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [9, 10], [9, 8]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [6, 5], [7, 5]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [0, 10], [0, 9]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [8, 4], [8, 5]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [0, 9], [0, 8]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [8, 3], [8, 4]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [0, 8], [1, 8]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [3, 4], [3, 5]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [7, 10], [7, 9]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [5, 3], [4, 3]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [9, 11], [9, 9]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [6, 3], [5, 3]);
    Util.attackAndCheck(test, world, world.players[0].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[1].id, [8, 10], [8, 8]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    Util.moveAndCheck(test, world, world.players[0].id, [6, 2], [6, 3]);
    Util.attackAndCheck(test, world, world.players[0].id, {from: [8, 5], to: [8, 8]});
    Util.skipBattleResultsPhase(test, world);

    Util.checkObject(test, world, [8, 5], null, null);
    Util.checkObject(test, world, [8, 8], null, null);

    Util.moveAndCheck(test, world, world.players[1].id, [10, 10], [8, 10]);
    Util.attackAndCheck(test, world, world.players[1].id, {skip: true});

    /*console.log(Util.getMap(world));*/

    test.done();
};


