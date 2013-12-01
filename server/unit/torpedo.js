var Unit = require('../unit.js');
var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

var Torpedo = module.exports = function(location, owner, world) {
    this.init(location, owner, 'torpedo', world);
    this.specialUnit = Config.MOVE_TORPEDO_SHIP;
    this.maxDistance = 2;
};
Torpedo.prototype = new Unit();


Torpedo.prototype.getSpecialUnitsNearPoint = function(cell) {
    var specialUnits = [];
    var aroundCells = cell.getAllNeighbors(this.maxDistance);
    for (var i in aroundCells) {
        var cell = aroundCells[i];
        if (cell.getObject() && cell.getObject().type == this.specialUnit && this.owner.id == cell.getObject().owner.id) {
            specialUnits.push(cell.getObject());
        }
    }
    return specialUnits;
};

Torpedo.prototype.setWhereCanMove = function() {
    this.whereCanMove = [];
    var i = 0, j = 0, cell = null, diagCells = [], allNeighborCells = [], specialUnitLocation = null;
    var specialUnits = this.getSpecialUnitsNearPoint(this.location);
    for (i in specialUnits) {
        specialUnitLocation = specialUnits[i].location;
        if (Math.abs(specialUnitLocation.x - this.location.x) == 1 //check if this torpedo is on diagonal (can move 2 points)
            && Math.abs(specialUnitLocation.y - this.location.y) == 1) {
            diagCells = specialUnits[i].location.getDiagonalFirstNeighborCells();
            for (j in diagCells) {
                cell = diagCells[j];
                if (!cell.getObject()
                    && (cell.x == this.location.x
                        || cell.y == this.location.y)
                    && !this.location.isEq(cell)
                    && !this.location.areObjectsBetween(cell)) {
                    this.whereCanMove.push(diagCells[j].getPoint());
                }
            }
        }
        allNeighborCells = specialUnits[i].location.getAllNeighbors(2); //get all other points
        for (j in allNeighborCells) {
            cell = allNeighborCells[j];
            if (!cell.getObject()
                && cell.getDist(this.location) == 1) {
                this.whereCanMove.push(cell.getPoint());
            }
        }
    }
};

Torpedo.prototype.getUnitsCanShoot = function() {
    var neighbors = this.location.getStraightNeighborCells(1);
    var specUnits = [];
    for (var i in neighbors) {
        if (neighbors[i].getObject() && neighbors[i].getObject().type == this.specialUnit) {
            specUnits.push(neighbors[i].getObject());
        }
    }
    return specUnits;
};

Torpedo.prototype.canAttack = function() {
    var shootingUnits = this.getUnitsCanShoot();
    return shootingUnits.length > 0;
};

Torpedo.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    if (!this.canAttack()) {
        return false;
    }
    var shootingUnits = this.getUnitsCanShoot();
    var points = [], moveCell = null, cell = null;
    for (var i in shootingUnits) {
        var unitLocation = shootingUnits[i].location;
        var x = this.location.x;
        var y = this.location.y;
        if (x == unitLocation.x) {
            var dy = y - unitLocation.y;
            moveCell = this.location.cells.get([unitLocation.x, unitLocation.y+3*dy]);
            points = [
                [unitLocation.x, unitLocation.y + 4*dy],
                [unitLocation.x - 1, unitLocation.y + 3*dy],
                [unitLocation.x + 1, unitLocation.y + 3*dy]
            ];
        } else {
            var dx = x - unitLocation.x;
            moveCell = this.location.cells.get([unitLocation.x + 3*dx, unitLocation.y]);
            points = [
                [unitLocation.x + 4*dx, unitLocation.y],
                [unitLocation.x + 3*dx, unitLocation.y - 1],
                [unitLocation.x + 3*dx, unitLocation.y + 1]
            ];
        }
        if (!moveCell || this.location.areObjectsBetween(moveCell) || moveCell.getObject()) {
            continue;
        }
        for (var j in points) {
            cell = this.world.cells.get(points[j]);
            if (cell) {
                this.whereCouldAttack.push(cell.getPoint());
                if (cell.hasEnemyObject(this.owner)) {
                    this.whereCanAttack.push(cell.getPoint());
                }
            }
        }
    }
};

Torpedo.prototype.attack = function(victim) {
    this.wasInBattle = true;
    this.setWhereAttack();
    var cell = null;
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (victim.location.isEq(cell)) {
            cell.getObject().kill();
            break;
        }
    }
    this.kill();
    return true;
};

Torpedo.prototype.harm = function(offender) {
    this.wasInBattle = true;
    if (this.canAttack()) {
        offender.kill();
    }
    this.kill();
    return true;
};
