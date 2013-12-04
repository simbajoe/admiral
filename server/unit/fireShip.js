var Unit = require('../unit.js');
var Utils = require('../../shared/utils.js');

var FireShip = module.exports = function(location, owner, world) {
    this.init(location, owner, 'fireShip', world);
    this.unitIdsWereNear = [];
    this.hasEndTurnFunc = true;
};

FireShip.prototype = new Unit();

FireShip.prototype.attack = function(victim) {
    this.wasInBattle = true;
    this.setWhereAttack();
    var cell = null;
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (victim.location.isEq(cell)) {
            victim.kill();
            break;
        }
    }
    this.kill();
    return true;
};

FireShip.prototype.harm = function(offender) {
    this.wasInBattle = true;
    offender.kill();
    this.kill();
    return true;
};

FireShip.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    var cells = this.location.getStraightNeighborCells(this.maxFireDistance);
    for (var i in cells) {
        this.whereCouldAttack.push(cells[i].getPoint());
        if (cells[i].hasEnemyObject(this.owner)
            && !this.location.areObjectsBetween(cells[i])
            && this.unitIdsWereNear.indexOf(cells[i].getObject().id) > -1) {
            this.whereCanAttack.push(cells[i].getPoint());
        }
    }
};

FireShip.prototype.endTurn = function() {
    this.wasInBattle = false;
    this.unitIdsWereNear =[];
    this.setWhereAttack();
    for (var i in this.whereCouldAttack) {
        var cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (cell && cell.hasEnemyObject(this.owner)) {
            this.unitIdsWereNear.push(cell.getObject().id);
        }
    }
};
