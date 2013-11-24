var Unit = require('../unit.js');

var AtomicBomb = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'atomicBomb', world);
};

AtomicBomb.prototype = new Unit();

AtomicBomb.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCanAttack.push(this.location);
    this.whereCouldAttack = [];
    for (var x = this.location.x - 2; x <= this.location.x + 2; x++) {
        for (var y = this.location.y - 2; y <= this.location.y + 2; y++) {
            var cell = this.world.cells.get(x,y);
            if (cell) {
                this.whereCouldAttack.push(cell);
            }
        }
    }
};