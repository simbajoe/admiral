var Unit = require('../unit.js');

var Raider = module.exports = function(location, owner, world) {
    this.init(location, owner, 'raider', world);
};

Raider.prototype = new Unit();
