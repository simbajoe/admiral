var Unit = require('../unit.js');

var Submarine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'submarine', world);
};

Submarine.prototype = new Unit();