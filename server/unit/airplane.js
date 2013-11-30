var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Airplane = module.exports = function(location, owner, world) {
    this.init(location, owner, 'airplane', world);
    this.specialUnit = Config.MOVE_AIRPLANE_SHIP;
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

Airplane.prototype.getAllCellsOx = function(y) {
    var result = [];
    for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
        var cell = this.world.cells.get([x,y]);
        if (cell) {
            result.push(cell);
        }
    }
    return result;
};

Airplane.prototype.getAllCellsOy = function(x) {
    var result = [];
    for (var y = Config.minWorldY; y <= Config.maxWorldY; y++) {
        var cell = this.world.cells.get([x,y]);
        if (cell) {
            result.push(cell);
        }
    }
    return result;
};

Airplane.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    if (!this.canAttack()) {
        return false;
    }
    var shootingUnits = this.getUnitsCanShoot();
    var cells = [], cell = null;
    for (var i in shootingUnits) {
        var unitLocation = shootingUnits[i].location;
        if (this.location.x == unitLocation.x) {
            cells = this.getAllCellsOy(unitLocation.x);
            //checking border existance
            if (!this.world.cells.get([unitLocation.x - 1, unitLocation.y])
                || !this.world.cells.get([unitLocation.x + 1, unitLocation.y])) {
                cells = cells.concat(this.getAllCellsOx(unitLocation.y));
                cells = cells.concat(this.getAllCellsOx(this.location.y));
            }
        } else {
            cells = this.getAllCellsOx(unitLocation.y);
            //checking border existance
            if (!this.world.cells.get([unitLocation.x, unitLocation.y - 1])
                || !this.world.cells.get([unitLocation.x, unitLocation.y + 1])) {
                cells = cells.concat(this.getAllCellsOy(unitLocation.x));
                cells = cells.concat(this.getAllCellsOy(this.location.x));
            }
        }
    }
    for (var j in cells) {
        if (!this.location.isEq(cells[j])) {
            cell = cells[j];
            this.whereCouldAttack.push(cell.getPoint());
            if (cell && cell.hasEnemyObject(this.owner)) {
                this.whereCanAttack.push(cell.getPoint());
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
            victim.kill();
            break;
        }
    }
    this.kill();
    return true;
};

Airplane.prototype.harm = function(offender) {
    if (this.canAttack()) {
        offender.kill();
    }
    this.kill();
    return true;
};
