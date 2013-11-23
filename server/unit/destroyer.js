var Unit = require('../unit.js');

var Destroyer = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'destroyer');
};

Destroyer.prototype = new Unit();