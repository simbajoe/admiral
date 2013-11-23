var Unit = require('../unit.js');

var Mine = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'mine', world);
};

Mine.prototype = new Unit();