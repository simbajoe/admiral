var Unit = require('../unit.js');

var Battleship = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'battleship', world);
};

Battleship.prototype = new Unit();