var Unit = require('../unit.js');

var Battleship = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'battleship');
};

Battleship.prototype = new Unit();