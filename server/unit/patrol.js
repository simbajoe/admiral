var Unit = require('../unit.js');

var Patrol = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'patrol', world);
};

Patrol.prototype = new Unit();