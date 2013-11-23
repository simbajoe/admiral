var Unit = require('../unit.js');

var Torpedo = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'torpedo');
};

Torpedo.prototype = new Unit();