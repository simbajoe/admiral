var Unit = require('../unit.js');

var Minesweeper = module.exports = function(location, owner, world) {
    this.init(location, owner, 'minesweeper', world);
};

Minesweeper.prototype = new Unit();
