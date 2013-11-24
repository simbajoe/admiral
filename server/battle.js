var Utils = require('../shared/utils.js');
var Config = require('../shared/config.js');

var Battle = module.exports = function(offenderUnit, defenderUnit, world) {
    this.world = world;
    this.offenders = [];
    this.defenders = [];
    this.offenderTypes = [];
    this.defenderTypes = [];
    this.offendersFireValue = 0;
    this.defendersFireValue = 0;
    this.addDefender(defenderUnit);
    this.addOffender(offenderUnit);
};

Battle.prototype.updateFireValue = function() {
    var defUpdated = this.defenderTypes == 0, offUpdated = this.offenderTypes == 0;
    for (var i in Config.possibleGroups) {
        var possibleGr = Config.possibleGroups[i].units;
        if (!defUpdated && this.areGroupsEq(this.defenderTypes, possibleGr)) {
            defUpdated = true;
            this.defendersFireValue = Config.possibleGroups[i].fireValue;
        }
        if (!offUpdated &&  this.areGroupsEq(this.offenderTypes, possibleGr)) {
            offUpdated = true;
            this.offendersFireValue = Config.possibleGroups[i].fireValue;
        }
    }
    if (!defUpdated || !offUpdated) {
        throw new Error('Unknown group in battle');
    }
};

Battle.prototype.areGroupsEq = function(group1, group2) {
    return group1.sort().join(',')== group2.sort().join(',');
};

Battle.prototype.addOffender = function(unit) {
    if (this.offenders.length == 3) {
        throw new Error('Tried to add more then 3 units in offender group');
    }
    this.offenders.push(unit);
    this.offenderTypes.push(unit.type);
    this.updateFireValue();
};

Battle.prototype.addDefender = function(unit) {
    if (this.offenders.length == 3) {
        throw new Error('Tried to add more then 3 units in defender group');
    }
    this.defenders.push(unit);
    this.defenderTypes.push(unit.type);
    this.updateFireValue();
};

Battle.prototype.canHaveSupport = function(units) {
    for (var i in units) {
        var cells = units[i].location.getStraightNeighborCells(1);
        for (var i in cells) {
            if (cells[i].getObject() && !cells[i].hasEnemyObject(units[i].owner)) {
                if (cells[i].getObject().type  in units[i].brotherUnits) { //todo:add this function, filtering config.possiblegroups
                    return true;
                }
            }
        }
    }
    return false;
};