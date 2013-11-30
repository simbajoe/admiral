var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Mine = module.exports = function(location, owner, world) {
    this.init(location, owner, 'mine', world);
    this.specialUnit = Config.MOVE_MINE_SHIP;
    this.maxFireDistance = 0;
    this.canBeKilledBy = Config.KILL_MINE;
};
Mine.prototype = new UnitSatellite();

Mine.prototype.harm = function(offender) {
    if (offender.type != this.canBeKilledBy) {
        offender.kill();
    }
    this.kill();
    return true;
};

Mine.prototype.attack = function(victim) {
    throw 'Mine cannot attack';
};
