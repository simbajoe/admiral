var Unit = require('../unit.js');

var FixedMine = module.exports = function(location, owner, world) {
    this.init(location, owner, 'fixedMine', world);
    this.maxDistance = 0;
    this.maxFireDistance = 0;
};

FixedMine.prototype = new Unit();

FixedMine.prototype.harm = function(offender) {
    this.wasInBattle = true;
    offender.kill();
    this.kill();
    return true;
};

FixedMine.prototype.attack = function(victim) {
    throw 'Fixed mine cannot attack';
};
