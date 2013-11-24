var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Airplane = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'airplane', world);
    this.specialUnit = Config.MOVE_AIRPLANE_SHIP;
    this.maxFireDistance = Config.maxWorldX - Config.minWorldX;
};

Airplane.prototype = new UnitSatellite();

Airplane.prototype.getUnitsCanShoot = function() {
    var neighbors = this.location.getStraightNeighborCells(1);
    var specUnits = [];
    for (var i in neighbors) {
        if (neighbors[i].getObject() && neighbors[i].getObject().type != this.specialUnit) {
            specUnits.push(neighbors[i].getObject());
        }
    }
    return specUnits;
};

Airplane.prototype.canAttack = function() {
    var shootingUnits = this.getUnitsCanShoot();
    return shootingUnits.length > 0;
};

Airplane.prototype.setWhereCanAttack = function() {
    this.whereCanAttack = [];
    if (!this.canAttack()) {
        return false;
    }
    var shootingUnits = this.getUnitsCanShoot();
    var points = [], cell = null;
    for (var i in shootingUnits) {
        var unit = shootingUnits[i];
        if (this.location.x == unit.x) {
            for (var y = Config.minWorldY; y <= Config.maxWorldY; y++) {
                cell = this.world.cells.get([unit.x, y]);
                if (cell && cell.hasEnemyObject(this.owner)) {
                    this.whereCanAttack.push(cell.getPoint());
                }
            }
        } else {
            for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
                cell = this.world.cells.get([x, unit.y]);
                if (cell && cell.hasEnemyObject(this.owner)) {
                    this.whereCanAttack.push(cell.getPoint());
                }
            }
        }
    }
};