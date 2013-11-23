var Unit = require('../unit.js');

var Vedette = module.exports = function(id, location, owner) {
    this.init(id, location, owner, 'vedette');
};

Vedette.prototype = new Unit();