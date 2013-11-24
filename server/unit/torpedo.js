var Unit = require('../unit.js');
var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

var Torpedo = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'torpedo', world);
    this.maxDistance = 2;
    this.specialUnit = Config.MOVE_TORPEDO_SHIP;
};
Torpedo.prototype = new Unit();


Torpedo.prototype.getSpecialUnitsNearPoint = function(point) {
    var specialUnits = [];
    var goalCell = this.world.getCell(point);
    if (!goalCell) {
        return false;
    }
    var aroundPoints = goalCell.getAllNeighbors(this.maxDistance);
    for (var i in aroundPoints) {
        var cell = this.world.getCell(aroundPoints[i]);
        if (cell && cell.getObject() && cell.getObject().type == this.specialUnit) {
            specialUnits.push(cell.getObject());
        }
    }
    return specialUnits;
};

Torpedo.prototype.move = function(toPoint) {
    this.setWhereCanMove();
    var cell = this.world.getCell(toPoint);
    if (!cell
        || this.world.getCell(toPoint).getObject()
        || !this.checkPointIsNearToMove(toPoint)) {
        return false;
    }
    for (var j in this.whereCanMove) {
        var tmpCell = this.world.getCell(this.whereCanMove[j]);
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
    var i = 0, j = 0, cell = null, diagPoints = [], allNeighborPoints = [], specialUnitLocationPoint = [], point= [];
    var specialUnits = this.getSpecialUnitsNearPoint(this.location.getPoint());
    for (i in specialUnits) {
        specialUnitLocationPoint = specialUnits[i].location.getPoint();
        if (Math.abs(specialUnitLocationPoint[0] - this.location.x) == 1 //check if this torpedo is on diagonal (can move 2 points)
            && Math.abs(specialUnitLocationPoint[1] - this.location.y) == 1) {
            diagPoints = specialUnits[i].location.getDiagonalFirstNeighborPoints();
            for (j in diagPoints) {
                cell = this.world.getCell(diagPoints[j]);
                if (cell
                    && !cell.getObject()
                    && (cell.x == this.location.x
                        || cell.y == this.location.y)
                    && !this.location.isEq(cell)) {
                    this.whereCanMove.push(diagPoints[j]);
                }
            }
        }
        allNeighborPoints = specialUnits[i].location.getAllNeighbors(this.maxDistance);
        for (j in allNeighborPoints) {
            cell = this.world.getCell(allNeighborPoints[j]);
            if (cell
                && !cell.getObject()
                && Utils.getDist(cell.getPoint(), this.location.getPoint()) == 1) {
                this.whereCanMove.push([cell.getPoint()]);
            }
        }
    }
};