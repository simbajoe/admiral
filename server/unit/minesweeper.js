var Unit = require('../unit.js');

var Minesweeper = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'minesweeper');
};

Minesweeper.prototype = new Unit();