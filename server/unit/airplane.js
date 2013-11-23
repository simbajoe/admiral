var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Airplane = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'airplane', world);
    this.specialUnit = Config.MOVE_AIRPLANE_SHIP;
};

Airplane.prototype = new UnitSatellite();