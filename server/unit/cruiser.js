var Unit = require('../unit.js');

var Cruiser = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'cruiser', world);
};

Cruiser.prototype = new Unit();