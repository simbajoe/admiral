var Unit = require('../unit.js');

var Airplane = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'airplane', world);
};

Airplane.prototype = new Unit();