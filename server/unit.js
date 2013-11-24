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

Unit.prototype.checkCellIsNearToMove = function(cell) {
    return (this.location.x == cell.x
        && this.location.y - cell.y <= this.maxDistance)
        || (this.location.y == cell.y
        && this.location.x - cell.x <= this.maxDistance);
};

Unit.prototype.move = function(cell) {
    if (!this.checkCellIsNearToMove(cell)
        || cell.getObject()
        || this.location.areObjectsBetween(cell)) {
        return false;
    }
    this.location.removeObject();
    this.location = cell;
    this.location.addObject(this);
    return true;
};

Unit.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var cells = this.location.getStraightNeighborCells(this.maxDistance);
    for (var i in cells) {
        var cell = cells[i];
        if (!cell.getObject() && !this.location.areObjectsBetween(cell)) {
            this.whereCanMove.push(cell.getPoint());
        }
    }
};
