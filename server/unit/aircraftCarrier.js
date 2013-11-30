var Unit = require('../unit.js');

var AircraftCarrier = module.exports = function(location, owner, world) {
    this.init(location, owner, 'aircraftCarrier', world);
};

AircraftCarrier.prototype = new Unit();
