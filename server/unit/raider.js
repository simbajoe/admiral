var Unit = require('../unit.js');

var Raider = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'raider', world);
};

Raider.prototype = new Unit();