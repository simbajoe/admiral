var Utils = require('../shared/utils.js');
var Config = require('../shared/config.js');
var Cell = require('./cell.js');

var Cells = module.exports = function() {
    this.cells = [];
    for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
        this.cells[x] = [];
        for (var y = Config.minWorldY; y <= Config.maxWorldX; y++) {
            this.cells[x][y] = new Cell(x,y, this);
        }
    }
};

Cells.prototype.get = function(location) {
    if (this.cells[location[0]] === undefined
        || this.cells[location[0]][location[1]] === undefined) {
        return null;
    }
    return this.cells[location[0]][location[1]];
};
