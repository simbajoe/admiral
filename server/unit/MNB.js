var Unit = require('../unit.js');

var MNB = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'MNB', world);
};

MNB.prototype = new Unit();