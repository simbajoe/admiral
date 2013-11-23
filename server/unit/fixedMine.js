var Unit = require('../unit.js');

var FixedMine = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'fixedMine');
};

FixedMine.prototype = new Unit();