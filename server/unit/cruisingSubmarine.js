var Unit = require('../unit.js');

var CruisingSubmarine = module.exports = function(location, owner, world) {
    this.init(location, owner, 'cruisingSubmarine', world);
};

CruisingSubmarine.prototype = new Unit();
