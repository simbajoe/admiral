var Unit = require('../unit.js');

var Patrol = module.exports = function(location, owner, world) {
    this.init(location, owner, 'patrol', world);
};

Patrol.prototype = new Unit();
