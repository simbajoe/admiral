var World = require('../world');
var Utils = require('../../shared/utils.js');
var Config = require('../../shared/config.js');

exports.testSupportPhase = function(test) {
    var world = new World();
    var cruiser = world.addUnit(world.players[1], 'cruiser', [5,5]);
    var destroyer1 = world.addUnit(world.players[0], 'destroyer', [5,4]);
    var destroyer2 = world.addUnit(world.players[0], 'destroyer', [5,3]);
    world.currentTurn = 0;
    world.phase = Config.ATTACK_PHASE;
    world.makeAttack({from:destroyer1.location.getPoint(), to: cruiser.location.getPoint()});
    test.ok(world.phase == Config.SUPPORT_PHASE, 'incorrect phase after attack');
    var hash = world.getHash();
    test.ok(hash.world.currentTurn == world.players[0].id, 'Incorrect current turn in hash in support phase');
    test.ok(hash.players[world.players[0].id].supportCells.length == 1, 'Support cells length incrorrect');
    world.makeSupport(destroyer2.location.getPoint());
    test.ok(world.phase == Config.MOVE_PHASE, 'incorrect phase after adding unit to battle');
    test.done();
};
