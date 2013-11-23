var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var Unit = module.exports = function() {};

Unit.prototype.init = function(id, location, owner, type, world) {
    this.id = id;
    this.location = location;
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

Unit.prototype.checkPointIsNotFarToMove = function(newPint) {
    return (this.location.x == toPoint[0]
        && this.location.y - toPoint[1] <= this.maxDistance)
        || (this.location.y == toPoint[1]
        && this.location.x - toPoint[0] <= this.maxDistance);
}

Unit.prototype.move = function(toPoint) {
    if (!this.checkPointIsNotFarToMove(toPoint)
        || this.world.getCell(toPoint).getObject()) {
        return false;
    }
    this.location.removeObject(this);
    this.location = this.world.getCell(toPoint);
    this.location.addObject(this);
    return true;
};

Unit.prototype.setWhereCanMove = function() {
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