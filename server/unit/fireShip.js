var Unit = require('../unit.js');

var FireShip = module.exports = function(id, location, owner, world) {
    this.init(id, location, owner, 'fireShip', world);
};

FireShip.prototype = new Unit();