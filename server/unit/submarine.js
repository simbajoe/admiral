var Unit = require('../unit.js');

var Submarine = module.exports = function(location, owner, world) {
    this.init(location, owner, 'submarine', world);
    this.maxDistance = 1;
};

Submarine.prototype = new Unit();