var Utils = require('../shared/utils.js');

var Cell = module.exports = function(x, y) {
    this.x = x;
    this.y = y;
    this.object = null;
};

Cell.prototype.addObject = function(object) {
    this.object = object;
};

Cell.prototype.removeObject = function(object) {
    this.object = null;
};

Cell.prototype.getObject = function() {
    return this.objects;
};

Cell.prototype.getPoint = function() {
    return [this.x, this.y];
};