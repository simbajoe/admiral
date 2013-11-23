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
    for (var d = 1; d <= this.distance; d++) {
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