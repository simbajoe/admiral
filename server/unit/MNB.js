var Unit = require('../unit.js');

var MNB = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'MNB');
};

MNB.prototype = new Unit();