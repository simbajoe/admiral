var Utils = require('../shared/utils.js');
var Config = require('../shared/config.js');

var BattleSide = module.exports = function(unit) {
    this.owner = unit.owner;
    this.units = [];
    this.unitTypes = [];
    this.fireValue = 0;
    this.supportSkipped = false;
    this.addUnit(unit);
};

BattleSide.prototype.getAllUnitIds = function() {
    var result = [];
    for (var i in this.units) {
        result.push(this.units[i].id);
    }
    return result;
};

BattleSide.prototype.skipSupport = function() {
    this.supportSkipped = true;
};

BattleSide.prototype.updateFireValue = function() {
    for (var i in Config.possibleGroups) {
        var possibleGr = Config.possibleGroups[i].units;
        if (this.areGroupsEq(this.unitTypes, possibleGr)) {
            this.fireValue = Config.possibleGroups[i].fireValue;
            break;
        }
    }
};

BattleSide.prototype.areGroupsEq = function(group1, group2) {
    return group1.sort().join(',')== group2.sort().join(',');
};


BattleSide.prototype.canAdd = function(unit) {
    for (var i in Config.possibleGroups) {
        var possibleGr = Config.possibleGroups[i].units;
        if (possibleGr.indexOf(unit.type) > -1) {
            return true;
        }
    }
    return false;
};


BattleSide.prototype.addUnit = function(unit) {
    if (this.units.length == 3 || !this.canAdd(unit) || unit.owner.id != this.owner.id) {
        console.log('Adding unit', unit.type, 'to group', this.unitTypes);
        throw new Error('Cannot add unit to group, no such group or group already has unit or side owner is not the same');
    }
    unit.joinBattle();
    this.units.push(unit);
    this.unitTypes.push(unit.type);
    this.updateFireValue();
};

BattleSide.prototype.getPossibleGroups = function(unitType) {
    var result = [];
    for (var i in Config.possibleGroups) {
        var group = Config.possibleGroups[i].units;
        if (group.indexOf(unitType) > -1) {
            result.push(group);
        }
    }
    return result;
};

BattleSide.prototype.canHaveSupport = function() {
    if (this.units.length == 3) {
        return false;
    }
    var cells = this.getSupportCells();
    return cells.length > 0 && !this.supportSkipped;
};

BattleSide.prototype.loose = function(opponent_unit) {
    for (var i in this.units) {
        if (this.units[i].type == 'cruisingSubmarine'
            && (opponent_unit.type == 'battleship' || opponent_unit.type == 'aircraftCarrier')) {
            continue;
        }
        this.units[i].kill();
    }
};

BattleSide.prototype.getSupportCells = function() {
    var result = [];
    var unitIds = [];
    for (var i in this.units) {
        unitIds.push(this.units[i].id)
    }
    for (var i in this.units) {
        var unit =  this.units[i];
        var cells = unit.location.getStraightNeighborCells(1);
        for (var j in cells) {
            var cell = cells[j];
            if (cell.getObject() && !cell.hasEnemyObject(unit.owner) && unitIds.indexOf(cell.getObject().id) == -1) {
                var possibleGroups = this.getPossibleGroups(unit.type);
                for (var k in possibleGroups) {
                    if (possibleGroups[k].indexOf(cell.getObject().type) > -1) {
                        result.push(cell);
                        break;
                    }
                }
            }
        }
    }
    return result;
};

