var Unit = require('../unit.js');

var FireShip = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'fireShip');
};

FireShip.prototype = new Unit();