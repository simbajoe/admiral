var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Airplane = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'airplane', world);
    this.specialUnit = Config.MOVE_AIRPLANE_SHIP;
    this.needBattle = false;
};

Airplane.prototype = new UnitSatellite();

Airplane.prototype.getUnitsCanShoot = function() {
    var neighbors = this.location.getStraightNeighborCells(1);
    var specUnits = [];
    for (var i in neighbors) {
        if (neighbors[i].getObject() && neighbors[i].getObject().type == this.specialUnit) {
            specUnits.push(neighbors[i].getObject());
        }
    }
    return specUnits;
};

Airplane.prototype.canAttack = function() {
    var shootingUnits = this.getUnitsCanShoot();
    return shootingUnits.length > 0;
};

Airplane.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    if (!this.canAttack()) {
        return false;
    }
    var shootingUnits = this.getUnitsCanShoot();
    var points = [], cell = null;
    for (var i in shootingUnits) {
        var unitLocation = shootingUnits[i].location;
        if (this.location.x == unitLocation.x) {
            for (var y = Config.minWorldY; y <= Config.maxWorldY; y++) {
                if (this.location.y != y) {
                    cell = this.world.cells.get([unitLocation.x, y]);
                    this.whereCouldAttack.push([unitLocation.x, y]);
                    if (cell && cell.hasEnemyObject(this.owner)) {
                        this.whereCanAttack.push(cell.getPoint());
                    }
                }
            }
        } else {
            for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
                if (this.location.x != x) {
                    cell = this.world.cells.get([x, unitLocation.y]);
                    this.whereCouldAttack.push([x, unitLocation.y]);
                    if (cell && cell.hasEnemyObject(this.owner)) {
                        this.whereCanAttack.push(cell.getPoint());
                    }
                }
            }
        }
    }
};

Airplane.prototype.attack = function(victim) {
    this.setWhereAttack();
    var cell = null;
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (victim.location.isEq(cell)) {
            victim.destroy();
            break;
        }
    }
    this.destroy();
    return true;
};

Airplane.prototype.harm = function(offender) {
    if (this.canAttack()) {
        offender.destroy();
    }
    this.destroy();
};
