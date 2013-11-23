var Unit = require('../unit.js');

var Cruiser = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'cruisers');
};

Cruiser.prototype = new Unit();