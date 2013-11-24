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
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    this.maxDistance = 1;
    this.maxFireDistance = 1;
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
    if (this.world.phase == Config.ATTACK_PHASE) {
        this.setWhereAttack();
        result.whereCanAttack = this.whereCanAttack;
        result.whereCouldAttack = this.whereCouldAttack;
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
    this.setWhereCanMove();
    if (cell.getObject()
        || !this.checkCellIsNearToMove(cell)) {
        return false;
    }
    for (var j in this.whereCanMove) {
        var tmpCell = this.world.cells.get(this.whereCanMove[j]);
        if (tmpCell && tmpCell.isEq(cell)) {
            this.location.removeObject();
            this.location = tmpCell;
            tmpCell.addObject(this);
            return true;
        }
    }
    return false;
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

Unit.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    var cells = this.location.getStraightNeighborCells(this.maxFireDistance);
    for (var i in cells) {
        this.whereCouldAttack.push(cells[i].getPoint());
        if (cells[i].hasEnemyObject(this.owner) && !this.location.areObjectsBetween(cells[i])) {
            this.whereCanAttack.push(cells[i].getPoint());
        }
    }
};