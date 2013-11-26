var World = require('../world');
var Utils = require('../../shared/utils.js');
var Config = require('../../shared/config.js');

exports.testTorpedoWhereAttack= function(test) {
    var world = new World();
    var torpedo = world.addUnit(world.players[0], 'torpedo', [5,5]);
    torpedo.setWhereAttack();
    test.ok(torpedo.whereCouldAttack.length == 0, 'torpedo not in attack mode could attack, zero expected');
    var vedette = world.addUnit(world.players[0], 'vedette', [5,4]);
    torpedo.setWhereAttack();
    test.ok(torpedo.whereCouldAttack.length == 3, 'incorrect length of where could attack, 3 expected');
    var mine = world.addUnit(world.players[1], 'mine', [4,7]);
    torpedo.setWhereAttack();
    test.ok(torpedo.whereCanAttack.length == 1, 'incorrect length of where can attack');
    test.ok(Utils.arePointsEq(torpedo.whereCanAttack[0], [4,7]), 'incorrect point in where can attack');
    test.done();
};
