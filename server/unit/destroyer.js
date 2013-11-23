var Unit = require('../unit.js');

var Destroyer = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'destroyer', world);
};

Destroyer.prototype = new Unit();