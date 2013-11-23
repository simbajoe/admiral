var Unit = require('../unit.js');

var Submarine = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'submarine');
};

Submarine.prototype = new Unit();