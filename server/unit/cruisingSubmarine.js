var Unit = require('../unit.js');

var CruisingSubmarine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'cruisingSubmarine', world);
};

CruisingSubmarine.prototype = new Unit();