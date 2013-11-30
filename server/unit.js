var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var Unit = module.exports = function() {};

var uniqueId = 1;

Unit.prototype.init = function(location, owner, type, world) {
    this.id = uniqueId;
    uniqueId++;
    this.location = location;
    this.owner = owner;
    this.type = type;
    this.world = world;
    this.location.addObject(this);
    this.whereCanMove = [];
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    this.maxDistance = 1;
    this.maxFireDistance = 1;
    this.needBattle = true;
    this.hasEndTurnFunc = false;
};

Unit.prototype.exportToSnapshot = function(forPlayer) {
    var result = {
        location: this.location.getPoint(),
        ownerId: this.owner.id
    };
    if (forPlayer.id == this.owner.id) {
        result['type'] = this.type;
        if (this.world.phase == Config.MOVE_PHASE) {
            this.setWhereCanMove();
            result.whereCanMove = this.whereCanMove;
        }
        if (this.world.phase == Config.ATTACK_PHASE) {
            this.setWhereAttack();
            result.whereCanAttack = this.whereCanAttack;
            result.whereCouldAttack = this.whereCouldAttack;
        }
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
    this.whereCouldAttack = [];
    var cells = this.location.getStraightNeighborCells(this.maxFireDistance);
    for (var i in cells) {
        this.whereCouldAttack.push(cells[i].getPoint());
        if (cells[i].hasEnemyObject(this.owner) && !this.location.areObjectsBetween(cells[i])) {
            this.whereCanAttack.push(cells[i].getPoint());
        }
    }
};

Unit.prototype.attack = function(victim) { //all special units don't run this function
    if (!victim.needBattle) {
        victim.harm(this);
        return true;
    }
    return false;
};

Unit.prototype.harm = function(offender) { //all special units don't run this function
    if (Config.KILLERS.indexOf(offender.type) > -1) {
        this.destroy();
    }
};

Unit.prototype.destroy = function() {
    this.world.removeUnit(this);
    this.owner.removeUnit(this);
    this.location.removeObject(this);
    delete this;
};

