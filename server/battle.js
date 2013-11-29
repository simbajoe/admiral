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


Battle.prototype.setWinner = function(side) {
    this.winner = side.owner;
    if (side === this.defender) {
        this.offender.loose(this.defender.units[0]);
        return;
    }
    this.defender.loose(this.offender.units[0]);
};

Battle.prototype.getSupportCells = function() {
    var result = [];
    if (!this.currentSupportSide) {
        throw new Error ('support cells asked with no current support player');
    }
    return this.currentSupportSide.getSupportCells();
};


Battle.prototype.update = function() {
    this.currentSupportPlayer = null;
    this.currentSupportSide = null;
    if (this.defender.units[0].type == 'submarine' || this.defender.units[0].type == 'cruisingSubmarine') {
        if (this.offender.units[0].type == 'battleship' || this.offender.units[0].type == 'aircraftCarrier') {
            this.setWinner(this.defender);
            return;
        }
    }
    if (this.offender.units[0].type == 'submarine' || this.offender.units[0].type == 'cruisingSubmarine') {
        if (this.defender.units[0].type == 'battleship' || this.defender.units[0].type == 'aircraftCarrier') {
            this.setWinner(this.offender);
            return;
        }
    }
    if (this.defender.fireValue > this.offender.fireValue) {
        if (this.offender.canHaveSupport()) {
            this.currentSupportPlayer = this.offender.owner;
            this.currentSupportSide = this.offender;
            return;
        } else {
            this.setWinner(this.defender);
            return;
        }
    }
    if (this.offender.fireValue > this.defender.fireValue) {
        if (this.defender.canHaveSupport()) {
            this.currentSupportPlayer = this.defender.owner;
            this.currentSupportSide = this.defender;
            return;
        } else {
            this.setWinner(this.offender);
            return;
        }
    }
    if (this.offender.canHaveSupport()) {
        this.currentSupportPlayer = this.offender.owner;
        this.currentSupportSide = this.offender;
        return;
    }
    if (this.defender.canHaveSupport()) {
        this.currentSupportPlayer = this.defender.owner;
        this.currentSupportSide = this.defender;
        return;
    }
    this.setDraw();
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

Battle.prototype.setDraw = function() {
    this.draw = true;
    var numOfUnitsToReplace = Math.min(this.offender.units.length, this.defender.units.length);
    for (var i = 0; i < numOfUnitsToReplace; i++) {
        var offLocation = this.offender.units[i].location;
        var defLocation = this.defender.units[i].location;
        offLocation.removeObject();
        defLocation.removeObject();
        offLocation.addObject(this.defender.units[i]);
        this.offender.units[i].location = defLocation;
        defLocation.addObject(this.offender.units[i]);
        this.defender.units[i].location = offLocation;
    }
};

Battle.prototype.skipSupport = function(player) {
    if (this.offender.owner === player) {
        this.offender.skipSupport();
    }
    if (this.defender.owner === player) {
        this.defender.skipSupport();
    }
};