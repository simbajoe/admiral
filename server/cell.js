var Cell = module.exports = function(x, y) {
    this.x = x;
    this.y = y;
    this.objects = [];
};

Cell.prototype.addObject = function(object) {
    this.objects.push(object);
};

Cell.prototype.hasObject = function() {
    return this.objects.length > 0;
};

Cell.prototype.getPoint = function() {
    return [this.x, this.y];
};