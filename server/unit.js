var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var Unit = module.exports = function() {};

Unit.prototype.init = function(id, location, owner, type) {
    this.id = id;
    this.location = location;
    this.owner = owner;
    this.type = type;
};

Unit.prototype.exportToHash = function() {
    return {
        id: this.id,
        location: this.location,
        ownerId: this.owner.id
    };
};