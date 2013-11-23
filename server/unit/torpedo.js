var Unit = require('../unit.js');

var Torpedo = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'torpedo', world);
};

Torpedo.prototype = new Unit();