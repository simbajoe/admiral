var Utils = require('../shared/utils.js');

var Cell = module.exports = function(x, y, cells) {
    this.x = x;
    this.y = y;
    this.cells = cells;
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

Cell.prototype.getStraightNeighborCells = function(distance) {
    var points = [], cells = [];
    for (var d = 1; d <= distance; d++) {
        points = [
            [this.x + d, this.y],
            [this.x - d, this.y],
            [this.x, this.y + d],
            [this.x, this.y - d]
        ];
        for (var i in points) {
            var cell = this.cells.get(points[i]);
            if (cell) {
                cells.push(cell);
            }
        }
    }
    return cells;
};

Cell.prototype.getDiagonalFirstNeighborCells = function() {
    var points = [
        [this.x + 1, this.y  + 1],
        [this.x - 1, this.y + 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y - 1]
    ];
    var cells = [];
    for (var i in points) {
        var cell = this.cells.get(points[i]);
        if (cell) {
            cells.push(cell);
        }
    }
    return cells;
};

Cell.prototype.getAllNeighbors = function(distance) {
    var strN = this.getStraightNeighborCells(distance);
    var diagN = this.getDiagonalFirstNeighborCells();
    return strN.concat(diagN);
};

Cell.prototype.isEq = function(cell) {
    return cell.x == this.x && cell.y == this.y;
};

Cell.prototype.getDist = function(cell) {
    return Math.sqrt(Math.pow((this.x - cell.x),2) + Math.pow((this.y - cell.y),2));
};

Cell.prototype.getCellsBetween = function(cell) {
    var result = [], newCell = null;
    if (this.isEq(cell)
        || (this.x != cell.x && this.y != cell.y)) {
        return result;
    }
    if (this.x == cell.x) {
        for (var y = Math.min(this.y, cell.y) + 1; y <= Math.max(this.y, cell.y) - 1; y++) {
            newCell = this.cells.get([this.x, y]);
            if (newCell) {
                result.push(newCell);
            }
        }
        return result;
    }
    for (var x = Math.min(this.x, cell.x) + 1; x <= Math.max(this.x, cell.x) - 1; x++) {
        newCell = this.cells.get([x, this.y]);
        if (newCell) {
            result.push(newCell);
        }
    }
    return result;
};

Cell.prototype.areObjectsBetween = function(cell) {
    var cellsBetween = this.getCellsBetween(cell);
    if (cellsBetween.length == 0) {
        return false;
    }
    for (var i in cellsBetween) {
        if (cellsBetween[i].getObject()) {
            return true;
        }
    }
    return false;
};

Cell.prototype.hasEnemyObject = function(player) {
    return this.getObject() && this.getObject().owner.id != player.id
};

