var Unit = require('../unit.js');

var AtomicBomb = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'atomicBomb', world);
};

AtomicBomb.prototype = new Unit();

AtomicBomb.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCanAttack.push(this.location.getPoint());
    this.whereCouldAttack = [];
    for (var x = this.location.x - 2; x <= this.location.x + 2; x++) {
        for (var y = this.location.y - 2; y <= this.location.y + 2; y++) {
            var cell = this.world.cells.get([x,y]);
            if (cell) {
                this.whereCouldAttack.push(cell.getPoint());
            }
        }
    }
};

AtomicBomb.prototype.attack = function(toLocation) {
    this.setWhereAttack();
    if (!this.location.isEq(toLocation)) {
        return false;
    }
    var cell = null;
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (cell && cell.getObject() && cell.getObject().id != this.id) {
            cell.getObject().destroy();
        }
    }
    this.destroy();
    return true;
};

AtomicBomb.prototype.harm = function(offender) {
    this.attack(this.location);
};