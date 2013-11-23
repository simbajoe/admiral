var Unit = require('../unit.js');

var CruisingSubmarine = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'cruisingSubmarine');
};

CruisingSubmarine.prototype = new Unit();