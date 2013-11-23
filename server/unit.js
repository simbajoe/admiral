var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var Unit = module.exports = function() {};

Unit.prototype.init = function(id, location, owner, type, world) {
    this.id = id;
    this.location = location;
    this.owner = owner;
    this.type = type;
    this.world = world;
    this.location.addObject(this);
};

Unit.prototype.exportToHash = function() {
    return {
        id: this.id,
        location: this.location.getPoint(),
        ownerId: this.owner.id,
        type: this.type
    };
};