var Unit = require('./unit.js');

var UnitSatellite = module.exports = function() {};
UnitSatellite.prototype = new Unit();

UnitSatellite.prototype.isSpecialUnitNearPoint = function(cell) {
    var aroundCells = cell.getAllNeighbors(this.maxDistance);
    for (var i in aroundCells) {
        var cell = aroundCells[i];
        if (cell.getObject() && cell.getObject().type == this.specialUnit) {
            return true;
        }
    }
    return false;
};

UnitSatellite.prototype.move = function(cell) {
    if (!cell.getObject()
        || !this.checkCellIsNearToMove(cell)
        || !this.isSpecialUnitNearPoint(this.location)
        || !this.isSpecialUnitNearPoint(cell)
        || this.location.areObjectsBetween(cell)) {
        return false;
    }
    this.location.removeObject();
    this.location = cell;
    this.location.addObject(this);
    return true;
};

UnitSatellite.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var cells = this.location.getAllNeighbors(this.maxDistance);
    for (var i in cells) {
        var cell = cells[i];
        if (!cell.getObject()
            && this.isSpecialUnitNearPoint(this.location)
            && this.isSpecialUnitNearPoint(cell)
            && !this.location.areObjectsBetween(cell)) {
            this.whereCanMove.push(cell.getPoint());
        }
    }
};