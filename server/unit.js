var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var Unit = module.exports = function() {};

Unit.prototype.init = function(id, location, owner, type, world) {
    this.id = id;
    this.location = location;
    location.addObject(this);
    this.owner = owner;
    this.type = type;
    this.world = world;
    this.location.addObject(this);
    this.whereCanMove = [];
    this.maxDistance = 1;
};

Unit.prototype.exportToHash = function() {
     var result = {
        id: this.id,
        location: this.location.getPoint(),
        ownerId: this.owner.id,
        type: this.type
    };
    if (this.world.phase == Config.MOVE_PHASE) {
        this.setWhereCanMove();
        result.whereCanMove = this.whereCanMove;
    }
    return result;
};

Unit.prototype.checkPointIsNearToMove = function(newPint) {
    return (this.location.x == toPoint[0]
        && this.location.y - toPoint[1] <= this.maxDistance)
        || (this.location.y == toPoint[1]
        && this.location.x - toPoint[0] <= this.maxDistance);
};

Unit.prototype.move = function(toPoint) {
    var cell = this.world.getCell(toPoint);
    if (!this.checkPointIsNearToMove(toPoint)
        || !cell
        || this.world.getCell(toPoint).getObject()
        || this.location.areObjectsBetween(cell)) {
        return false;
    }
    this.location.removeObject();
    this.location = this.world.getCell(toPoint);
    this.location.addObject(this);
    return true;
};

Unit.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var points = this.location.getStraightNeighborPoints(this.maxDistance);
    for (var i in points) {
        var cell = this.world.getCell(points[i]);
        if (cell && !cell.getObject() && !this.location.areObjectsBetween(cell)) {
            this.whereCanMove.push(cell.getPoint());
        }
    }
};
