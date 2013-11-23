var Utils = require('../shared/utils.js');

var Cell = module.exports = function(x, y) {
    this.x = x;
    this.y = y;
    this.object = null;
};

Cell.prototype.addObject = function(object) {
    this.object = object;
};

Cell.prototype.removeObject = function() {
    this.object = null;
};

Cell.prototype.getObject = function() {
    return this.object;
};

Cell.prototype.getPoint = function() {
    return [this.x, this.y];
};