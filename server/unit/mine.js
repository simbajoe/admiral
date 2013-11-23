var Unit = require('../unit.js');
var Config = require('../../shared/config.js');

var Mine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'mine', world);
};
Mine.prototype = new Unit();

Mine.prototype.isSpecialUnitNearPoint = function(point) {
    var goalCell = this.world.getCell(point);
    if (!goalCell) {
        return false;
    }
    var aroundPoints = goalCell.getAllNeighbors(this.maxDistance);
    for (var i in aroundPoints) {
        var cell = this.world.getCell(aroundPoints[i]);
        if (cell && cell.getObject() && cell.getObject().type == Config.MOVE_MINE_SHIP) {
            return true;
        }
    }
    return false;
};

Mine.prototype.move = function(toPoint) {
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

Mine.prototype.setWhereCanMove = function() {
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