var Unit = require('../unit.js');

var MNB = module.exports = function(location, owner, world) {
    this.init(location, owner, 'MNB', world);
    this.maxDistance = 0;
    this.maxFireDistance = 0;
};

MNB.prototype = new Unit();

MNB.prototype.harm = function(offender) {
    this.wasInBattle = true;
    this.kill();
    return true;
};

MNB.prototype.attack = function(victim) {
    throw 'MNB cannot attack';
};
