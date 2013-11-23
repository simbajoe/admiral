var Unit = require('../unit.js');

var Airplane = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'airplane');
};

Airplane.prototype = new Unit();