var Unit = require('../unit.js');

var Battleship = module.exports = function(location, owner, world) {
    this.init(location, owner, 'battleship', world);
};

Battleship.prototype = new Unit();
