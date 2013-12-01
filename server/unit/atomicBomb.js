var Unit = require('../unit.js');

var AtomicBomb = module.exports = function(location, owner, world) {
    this.init(location, owner, 'atomicBomb', world);
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

AtomicBomb.prototype.attack = function(victim) {
    this.kill();
    return true;
};

AtomicBomb.prototype.harm = function(offender) {
    return this.attack(this.location);
};

AtomicBomb.prototype.kill = function() {
    this.setWhereAttack();
    this.isAlive = false;
    for (var i in this.whereCouldAttack) {
        var cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (cell
            && cell.getObject()
            && cell.getObject().isAlive) {
            cell.getObject().kill();
        }
    }
    this.owner.removeUnit(this);
    this.location.removeObject(this);
    delete this;
};
