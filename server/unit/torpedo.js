var Unit = require('../unit.js');
var Config = require('../../shared/config.js');
var Utils = require('../../shared/utils.js');

var Torpedo = module.exports = function(location, owner, world) {
    this.init(location, owner, 'torpedo', world);
    this.specialUnit = Config.MOVE_TORPEDO_SHIP;
    this.whereCanAttackPerUnit = [];
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
                if ((cell.x == this.location.x
                        || cell.y == this.location.y)
                    && !this.location.isEq(cell)) {
                    this.whereCouldMove.push(diagCells[j].getPoint());
                    if (!cell.getObject() && !this.location.areObjectsBetween(cell)) {
                        this.whereCanMove.push(diagCells[j].getPoint());
                    }
                }
            }
        }
        allNeighborCells = specialUnits[i].location.getAllNeighbors(2); //get all other points
        for (j in allNeighborCells) {
            cell = allNeighborCells[j];
            if (cell.getDist(this.location) == 1) {
                this.whereCouldMove.push(cell.getPoint());
                if (!cell.getObject()) {
                    this.whereCanMove.push(cell.getPoint());
                }
            }
        }
    }
};

Torpedo.prototype.getUnitsCanShoot = function() {
    var neighbors = this.location.getStraightNeighborCells(1);
    var specUnits = [];
    for (var i in neighbors) {
        if (neighbors[i].getObject()
            && neighbors[i].getObject().type == this.specialUnit
            && neighbors[i].getObject().owner.id == this.owner.id) {
            specUnits.push(neighbors[i].getObject());
        }
    }
    return specUnits;
};

Torpedo.prototype.getCurrentShootingUnit = function(target) {
    for (var i in this.whereCanAttackPerUnit) {
        var struct = this.whereCanAttackPerUnit[i];
        for (var j in struct.targets) {
            if (struct.targets[j].isEq(target)) {
                return struct.unit;
            }
        }
    }
    return null;
};

Torpedo.prototype.canAttack = function() {
    var shootingUnits = this.getUnitsCanShoot();
    return shootingUnits.length > 0;
};

Torpedo.prototype.setWhereAttack = function() {
    this.whereCanAttack = [];
    this.whereCouldAttack = [];
    this.whereCanAttackPerUnit = [];
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
        var struct = {};
        struct.unit = shootingUnits[i];
        struct.targets = [];
        for (var j in points) {
            cell = this.world.cells.get(points[j]);
            if (cell) {
                this.whereCouldAttack.push(cell.getPoint());
                if (cell.hasEnemyObject(this.owner)) {
                    this.whereCanAttack.push(cell.getPoint());
                    struct.targets.push(cell);
                }
            }
        }
        this.whereCanAttackPerUnit.push(struct);
    }
};

Torpedo.prototype.attack = function(defender) {
    this.setWhereAttack();
    var cell = null;
    for (var i in this.whereCouldAttack) {
        cell = this.world.cells.get(this.whereCouldAttack[i]);
        if (defender.location.isEq(cell)) {
            this.wasInBattle = true;
            this.getCurrentShootingUnit(defender.location).joinBattle();
            cell.getObject().kill();
            break;
        }
    }
    this.kill();
    return true;
};

Torpedo.prototype.harm = function(offender) {
    this.wasInBattle = true;
    var unitsCanShoot = this.getUnitsCanShoot();
    if (unitsCanShoot.length > 0) {
        unitsCanShoot[0].joinBattle();
        offender.kill();
    }
    this.kill();
    return true;
};
