var Unit = require('../unit.js');

var Cruiser = module.exports = function(location, owner, world) {
    this.init(location, owner, 'cruiser', world);
};

Cruiser.prototype = new Unit();
