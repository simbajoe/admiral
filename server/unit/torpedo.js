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
    var cells = this.location.getStraightNeighborCells(this.maxFireDistance);
    for (var i in cells) {
        var object = cells[i].getObject();
        if (object && object.owner.id != this.owner.id && !this.location.areObjectsBetween(cells[i])) {
            this.whereCanAttack.push(cells[i].getPoint());
        }
    }
};