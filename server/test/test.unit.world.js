var World = require('../world');
var Utils = require('../../shared/utils.js');
var Config = require('../../shared/config.js');
var TestUtil = require('../test_util.js');

exports.testSupportPhase = function(test) {
    var world = new World();
    var cruiser = TestUtil.addUnit(test, world, world.players[1], 'cruiser', [5,5]);
    var destroyer1 = TestUtil.addUnit(test, world, world.players[0], 'destroyer', [5,4]);
    var destroyer2 = TestUtil.addUnit(test, world, world.players[0], 'destroyer', [5,3]);
    world.currentPlayerId = world.players[0].id;
    world.phase = Config.ATTACK_PHASE;
    TestUtil.attackAndCheck(test, world, world.players[0].id, {from:destroyer1.location.getPoint(), to: cruiser.location.getPoint()});
    test.ok(world.phase == Config.SUPPORT_PHASE, 'incorrect phase after attack');
    var hash = world.getSnapshot(world.players[0]);
    test.ok(hash.world.currentPlayerId == world.players[0].id, 'Incorrect current turn in hash in support phase');
    test.ok(hash.players[world.players[0].id].supportCells.length == 1, 'Support cells length incrorrect');
    for (var i in hash.players[world.players[1].id].units) {
        var unit = hash.players[world.players[1].id].units[i];
        if (unit.id == cruiser.id) {
            test.ok(unit.type == cruiser.type, 'Type is not visible in support phase');
        }
    }
    TestUtil.supportAndCheck(test, world, world.players[0].id, destroyer2.location.getPoint());
    test.ok(world.phase == Config.BATTLE_RESULTS_PHASE, 'incorrect phase after adding unit to battle, ' +
        'battle results expected; ' + world.phase + ' discovered');
    world.skipTurn(world.players[0]);
    test.ok(world.phase == Config.BATTLE_RESULTS_PHASE, 'incorrect phase after one player skipped ' +
        'battle results phase; move phase expected; ' + world.phase + ' discovered');
    world.skipTurn(world.players[1]);
    test.ok(world.phase == Config.MOVE_PHASE, 'incorrect phase after skipping battle results phase; move phase ' +
        'expected; ' + world.phase + ' discovered');
    test.done();
};
