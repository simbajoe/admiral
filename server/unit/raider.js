var Unit = require('../unit.js');

var Raider = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'raider');
};

Raider.prototype = new Unit();