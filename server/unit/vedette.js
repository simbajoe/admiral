var Unit = require('../unit.js');

var Vedette = module.exports = function(location, owner, world) {
    this.init(location, owner, 'vedette', world);
    this.maxDistance = 2;
};

Vedette.prototype = new Unit();