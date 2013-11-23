var Unit = require('../unit.js');

var Minesweeper = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'minesweeper', world);
};

Minesweeper.prototype = new Unit();