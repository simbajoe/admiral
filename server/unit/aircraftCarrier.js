var Unit = require('../unit.js');

var AircraftCarrier = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'aircraftCarrier', world);
};

AircraftCarrier.prototype = new Unit();