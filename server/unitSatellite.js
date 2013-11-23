var Unit = require('./unit.js');

var UnitSatellite = module.exports = function() {};
UnitSatellite.prototype = new Unit();

UnitSatellite.prototype.isSpecialUnitNearPoint = function(point) {
    var goalCell = this.world.getCell(point);
    if (!goalCell) {
        return false;
    }
    var aroundPoints = goalCell.getAllNeighbors(this.maxDistance);
    for (var i in aroundPoints) {
        var cell = this.world.getCell(aroundPoints[i]);
        if (cell && cell.getObject() && cell.getObject().type == this.specialUnit) {
            return true;
        }
    }
    return false;
};

UnitSatellite.prototype.move = function(toPoint) {
    var cell = this.world.getCell(toPoint);
    if (!cell
        || this.world.getCell(toPoint).getObject()
        || !this.checkPointIsNotFarToMove(toPoint)
        || !this.isSpecialUnitNearPoint(this.location.getPoint())
        || !this.isSpecialUnitNearPoint(toPoint)
        ) {
        return false;
    }
    this.location.removeObject();
    this.location = this.world.getCell(toPoint);
    this.location.addObject(this);
    return true;
};

UnitSatellite.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var points = this.location.getAllNeighbors(this.maxDistance);
    for (var i in points) {
        var cell = this.world.getCell(points[i]);
        if (cell
            && !cell.getObject()
            && this.isSpecialUnitNearPoint(this.location.getPoint())
            && this.isSpecialUnitNearPoint(points[i])) {
            this.whereCanMove.push(cell.getPoint());
        }
    }
};