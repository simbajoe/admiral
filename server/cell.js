var Utils = require('../shared/utils.js');

var Cell = module.exports = function(x, y) {
    this.x = x;
    this.y = y;
    this.object = null;
};

Cell.prototype.addObject = function(object) {
    this.object = object;
};

Cell.prototype.removeObject = function() {
    this.object = null;
};

Cell.prototype.getObject = function() {
    return this.object;
};

Cell.prototype.getPoint = function() {
    return [this.x, this.y];
};

Cell.prototype.getStraightNeighborPoints = function(distance) {
    var points = [];
    var point = this.getPoint();
    for (var d = 1; d <= distance; d++) {
        points.push([point[0] + d, point[1]]);
        points.push([point[0] - d, point[1]]);
        points.push([point[0], point[1] + d]);
        points.push([point[0], point[1] - d]);
    }
    return points;
};

Cell.prototype.getDiagonalFirstNeighborPoints = function() {
    var point = this.getPoint();
    var points = [
        [point[0] + 1, point[1]  + 1],
        [point[0] - 1, point[1] + 1],
        [point[0] + 1, point[1] - 1],
        [point[0] - 1, point[1] - 1]
    ];
    return points;
};

Cell.prototype.getAllNeighbors = function(distance) {
    var strN = this.getStraightNeighborPoints(distance);
    var diagN = this.getDiagonalFirstNeighborPoints();
    return strN.concat(diagN);
};

Cell.prototype.isEq = function(cell) {
    return cell.x == this.x && cell.y == this.y;
};

Cell.prototype.getDist = function(cell) {
    return Math.sqrt(Math.pow((this.x - cell.x),2) + Math.pow((this.y - cell.y),2));
};

Cell.prototype.getPointsBetween = function(cell) {
    var result = [];
    if (this.isEq(cell)
        || (this.x != cell.x && this.y != cell.y)) {
        return result;
    }
    if (this.x = cell.x) {
        for (var y = Math.min(this.y, cell.y) + 1; y <= Math.max(this.y, cell.y) - 1; y++) {
            result.push([this.x, y]);
        }
        return result;
    }
    for (var x = Math.min(this.x, cell.x) + 1; y <= Math.max(this.x, cell.x) - 1; y++) {
        result.push([x, this.y]);
    }
    return result;
};

Cell.prototype.areObjectsBetween = function(cell) {
    var pointsBetween = this.getPointsBetween(cell);
    for (var i in pointsBetween) {
        var cell = pointsBetween[i];
        if (!cell || cell.getObject()) {
            return false;
        }
    }
    return true;
};