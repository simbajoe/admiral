var Unit = require('../unit.js');

var FireShip = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'fireShip', world);
    this.needBattle = false;
};

FireShip.prototype = new Unit();

FireShip.prototype.attack = function(toLocation) {
    this.setWhereAttack();
    var cell = null;
    //todo: whereCouldAttack can be triggered only after 1 turn being near victim
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (toLocation.isEq(cell)) {
            cell.getObject().destroy();
            break;
        }
    }
    this.destroy();
    return true;
};

FireShip.prototype.harm = function(offender) {
    offender.destroy();
    this.destroy();
    return true;
};