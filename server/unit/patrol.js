var Unit = require('../unit.js');

var Patrol = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'patrol');
};

Patrol.prototype = new Unit();