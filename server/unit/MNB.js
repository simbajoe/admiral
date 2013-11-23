var Unit = require('../unit.js');

var MNB = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'MNB', world);
    this.maxDistance = 0;
};

MNB.prototype = new Unit();