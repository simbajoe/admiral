var Unit = require('../unit.js');

var AtomicBomb = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'atomicBomb', world);
};

AtomicBomb.prototype = new Unit();

AtomicBomb.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    var shootingUnits = this.getUnitsCanShoot();
};