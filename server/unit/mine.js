var UnitSatellite = require('../unitSatellite.js');
var Config = require('../../shared/config.js');

var Mine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'mine', world);
    this.specialUnit = Config.MOVE_MINE_SHIP;
    this.maxFireDistance = 0;
};
Mine.prototype = new UnitSatellite();