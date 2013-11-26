var Utils = require('../shared/utils.js');
var Config = require('../shared/config.js');
var Side = require('./battle.side.js');

var Battle = module.exports = function(defenderUnit, offenderUnit) {
    this.defender = new Side(defenderUnit);
    this.offender = new Side(offenderUnit);
    this.winnerPlayer = null;
    this.currentSupportPlayer = null;
    this.draw = false;
    this.update();
};

Battle.prototype.defenderWins = function() {
    this.winnerPlayer = this.defender.owner;
    this.offender.loose();
};

Battle.prototype.offenderWins = function() {
    this.winnerPlayer = this.defender.owner;
    this.defender.loose();
};



Battle.prototype.update = function() {
    if (this.defender.fireValue > this.offender.fireValue) {
        if (this.offender.canHaveSupport()) {
            this.currentSupportPlayer = this.offender.owner;
            return;
        } else {
            this.defenderWins();
            return;
        }
    }
    if (this.offender.fireValue > this.defender.fireValue) {
        if (this.defender.canHaveSupport()) {
            this.currentSupportPlayer = this.defender.owner;
            return;
        } else {
            this.offenderWins();
            return;
        }
    }
    if (this.offender.fireValue == this.defender.fireValue) {
        if (this.offender.canHaveSupport()) {
            this.currentSupportPlayer = this.offender.owner;
            return;
        }
        if (this.defender.canHaveSupport()) {
            this.currentSupportPlayer = this.defender.owner;
            return;
        }
        //TODO: add draw trigger
        this.draw = true;
    }
};

Battle.prototype.addUnit = function(unit) {
    if (this.defender.owner.id == unit.owner.id) {
        this.defender.addUnit(unit);
        this.update();
        return;
    }
    if (this.offender.owner.id == unit.owner.id) {
        this.offender.addUnit(unit);
        this.update();
        return;
    }
};
