var Unit = require('../unit.js');

var Mine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'mine', world);
    this.maxDistance = 2;
};
Mine.prototype = new Unit();

Mine.prototype.canBeMovedTo = function(point) {
    if (!this.checkPointIsNotFarToMove(point)) {
        return false;
    }
    return true;
};

Mine.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    for (var d = 1; d <= this.maxDistance; d++) {
        var cells = [
            this.world.getCell([this.location.x + d, this.location.y]),
            this.world.getCell([this.location.x - d, this.location.y]),
            this.world.getCell([this.location.x, this.location.y + d]),
            this.world.getCell([this.location.x, this.location.y - d])
        ];
        for (var i in cells) {
            if (cells[i] && !cells[i].getObject()) {
                this.whereCanMove.push(cells[i].getPoint());
            }
        }
    }
};

Mine.prototype.checkPointIsNotFarToMove = function(newPint) {
    return (this.location.x == toPoint[0]
        && this.location.y - toPoint[1] <= this.maxDistance)
        || (this.location.y == toPoint[1]
        && this.location.x - toPoint[0] <= this.maxDistance);
};

Mine.prototype.move = function(toPoint) {
    if (!this.checkPointIsNotFarToMove(toPoint)
        || this.world.getCell(toPoint).getObject()) {
        return false;
    }
    this.location.removeObject(this);
    this.location = this.world.getCell(toPoint);
    this.location.addObject(this);
    return true;
};