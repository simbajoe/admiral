var Unit = require('../unit.js');

var FixedMine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'fixedMine', world);
};

FixedMine.prototype = new Unit();