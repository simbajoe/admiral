var Unit = require('../unit.js');
var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

var Torpedo = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'torpedo', world);
    this.maxDistance = 2;
    this.specialUnit = Config.MOVE_TORPEDO_SHIP;
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

Torpedo.prototype.move = function(cell) {
    this.setWhereCanMove();
    if (cell.getObject()
        || !this.checkCellIsNearToMove(cell)) {
        return false;
    }
    for (var j in this.whereCanMove) {
        var tmpCell = this.world.cells.get(this.whereCanMove[j]);
        if (tmpCell && tmpCell.isEq(cell)) {
            this.location.removeObject();
            this.location = tmpCell;
            tmpCell.addObject(this);
            return true;
        }
    }
    return false;
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