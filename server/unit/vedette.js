var Unit = require('../unit.js');

var Vedette = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'vedette', world);
};

Vedette.prototype = new Unit();