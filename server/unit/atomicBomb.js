var Unit = require('../unit.js');

var AtomicBomb = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'atomicBomb');
};

AtomicBomb.prototype = new Unit();