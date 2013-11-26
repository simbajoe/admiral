var Unit = require('../unit.js');

var FixedMine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'fixedMine', world);
    this.maxDistance = 0;
    this.maxFireDistance = 0;
    this.needBattle = false;
};

FixedMine.prototype = new Unit();

FixedMine.prototype.harm = function(offender) {
    offender.destroy();
    this.destroy();
};

FixedMine.prototype.attack = function(victim) {
    throw 'Fixed mine cannot attack';
};