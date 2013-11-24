var Unit = require('../unit.js');
var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

var Torpedo = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'torpedo', world);
    this.specialUnit = Config.MOVE_TORPEDO_SHIP;
    this.maxDistance = 2;
};
Torpedo.prototype = new Unit();


Torpedo.prototype.getSpecialUnitsNearPoint = function(cell) {
    var specialUnits = [];
    var aroundCells = cell.getAllNeighbors(this.maxDistance);
    for (var i in aroundCells) {
        var cell = aroundCells[i];
        if (cell.getObject() && cell.getObject().type == this.specialUnit) {
            specialUnits.push(cell.getObject());
        }
    }
    return specialUnits;
};

Torpedo.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var i = 0, j = 0, cell = null, diagCells = [], allNeighborCells = [], specialUnitLocation = null;
    var specialUnits = this.getSpecialUnitsNearPoint(this.location);
    for (i in specialUnits) {
        specialUnitLocation = specialUnits[i].location;
        if (Math.abs(specialUnitLocation.x - this.location.x) == 1 //check if this torpedo is on diagonal (can move 2 points)
            && Math.abs(specialUnitLocation.y - this.location.y) == 1) {
            diagCells = specialUnits[i].location.getDiagonalFirstNeighborCells();
            for (j in diagCells) {
                cell = diagCells[j];
                if (!cell.getObject()
                    && (cell.x == this.location.x
                        || cell.y == this.location.y)
                    && !this.location.isEq(cell)
                    && !this.location.areObjectsBetween(cell)) {
                    this.whereCanMove.push(diagCells[j].getPoint());
                }
            }
        }
        allNeighborCells = specialUnits[i].location.getAllNeighbors(2); //get all other points
        for (j in allNeighborCells) {
            cell = allNeighborCells[j];
            if (!cell.getObject()
                && cell.getDist(this.location) == 1) {
                this.whereCanMove.push(cell.getPoint());
            }
        }
    }
};

Torpedo.prototype.getUnitsCanShoot = function() {
    var neighbors = this.location.getStraightNeighborCells(1);
    var specUnits = [];
    for (var i in neighbors) {
        if (neighbors[i].getObject() && neighbors[i].getObject().type != this.specialUnit) {
            specUnits.push(neighbors[i].getObject());
        }
    }
    return specUnits;
};

Torpedo.prototype.canAttack = function() {
    var shootingUnits = this.getUnitsCanShoot();
    return shootingUnits.length > 0;
};

Torpedo.prototype.setWhereCanAttack = function() {
    this.whereCanAttack = [];
    if (!this.canAttack()) {
        return false;
    }
    var shootingUnits = this.getUnitsCanShoot();
    var points = [], moveCell = null, cell = null;
    for (var i in shootingUnits) {
        var unit = shootingUnits[i];
        var x = this.location.x;
        var y = this.location.y;
        if (this.location.x == unit.x) {
            var dy = y - unit.y;
            moveCell = this.location.cells.get([unit.x, unit.y+3*dy]);
            points = [
                [unit.x, unit.y + 4*dy],
                [unit.x - 1, unit.y + 3*dy],
                [unit.x + 1, unit.y + 3*dy]
            ];
        } else {
            var dx = x - unit.x;
            moveCell = this.location.cells.get([unit.x + 3*dx, unit.y]);
            points = [
                [unit.x + 4*dx, unit.y],
                [unit.x + 3*dx, unit.y - 1],
                [unit.x + 3*dx, unit.y + 1]
            ];
        }
        if (!moveCell || this.location.areObjectsBetween(moveCell)) {
            continue;
        }
        for (var j in points) {
            cell = this.world.cells.get(points[j]);
            if (cell && cell.hasEnemyObject(this.owner)) {
                this.whereCanAttack.push(cell.getPoint());
            }
        }
    }
};