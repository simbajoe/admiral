var Unit = require('../unit.js');

var MNB = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'MNB', world);
    this.maxDistance = 0;
    this.maxFireDistance = 0;
    this.needBattle = false;
};

MNB.prototype = new Unit();

MNB.prototype.harm = function(offender) {
    //todo: add game over
    this.destroy();
    return true;
};

MNB.prototype.attack = function(victim) {
    throw 'MNB cannot attack';
};