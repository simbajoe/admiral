var Utils = require('../shared/utils.js');
var Config = require('../shared/config.js');
var Side = require('./battle.side.js');

var Battle = module.exports = function(defenderUnit, offenderUnit) {
    this.defender = new Side(defenderUnit);
    this.offender = new Side(offenderUnit);
    this.winner = null;
    this.currentSupportPlayer = null;
    this.currentSupportSide = null;
    this.draw = false;
    this.update();
};

Battle.prototype.defenderWins = function() {
    this.winner = this.defender.owner;
    this.offender.loose();
};

Battle.prototype.offenderWins = function() {
    this.winner = this.defender.owner;
    this.defender.loose();
};

Battle.prototype.getSupportCells = function() {
    var result = [];
    if (!this.currentSupportSide) {
        throw new Error ('support cells asked with no current support player');
    }
    return this.currentSupportSide.getSupportCells();
};


Battle.prototype.update = function() {
    if (this.defender.fireValue > this.offender.fireValue) {
        if (this.offender.canHaveSupport()) {
            this.currentSupportPlayer = this.offender.owner;
            this.currentSupportSide = this.offender;
            return;
        } else {
            this.defenderWins();
            return;
        }
    }
    if (this.offender.fireValue > this.defender.fireValue) {
        if (this.defender.canHaveSupport()) {
            this.currentSupportPlayer = this.defender.owner;
            this.currentSupportSide = this.defender;
            return;
        } else {
            this.offenderWins();
            return;
        }
    }
    if (this.offender.fireValue == this.defender.fireValue) {
        if (this.offender.canHaveSupport()) {
            this.currentSupportPlayer = this.offender.owner;
            this.currentSupportSide = this.offender;
            return;
        }
        if (this.defender.canHaveSupport()) {
            this.currentSupportPlayer = this.defender.owner;
            this.currentSupportSide = this.defender;
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
    }
};
