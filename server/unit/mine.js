var Unit = require('../unit.js');

var Mine = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'mine');
};

Mine.prototype = new Unit();