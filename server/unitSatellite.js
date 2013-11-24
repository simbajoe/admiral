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

UnitSatellite.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var cells = this.location.getStraightNeighborCells(this.maxDistance);
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