var Unit = require('../unit.js');

var Destroyer = module.exports = function(location, owner, world) {
    this.init(location, owner, 'destroyer', world);
};

Destroyer.prototype = new Unit();
