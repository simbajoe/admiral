var Unit = require('../unit.js');

var AircraftCarrier = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'aircraftCarrier');
};

AircraftCarrier.prototype = new Unit();