var Unit = require('../unit.js');
var Config = require('../../shared/config.js');

var AircraftCarrier = module.exports = function(location, owner, world) {
    this.init(location, owner, 'aircraftCarrier', world);
    this.canBeKilledBy = Config.KILL_AIRCRAFT_CARRIER;
};

AircraftCarrier.prototype = new Unit();

AircraftCarrier.prototype.attack = function(defender) {
    this.wasInBattle = true;
    if (this.canBeKilledBy.indexOf(defender.type) > -1) {
        this.kill();
        defender.joinBattle();
        return true;
    }
    return defender.harm(this);
};

AircraftCarrier.prototype.harm = function(offender) {
    this.wasInBattle = true;
    if (this.canBeKilledBy.indexOf(offender.type) > -1) {
        this.kill();
        return true;
    }
};