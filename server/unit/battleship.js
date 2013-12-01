var Unit = require('../unit.js');
var Config = require('../../shared/config.js');

var Battleship = module.exports = function(location, owner, world) {
    this.init(location, owner, 'battleship', world);
    this.canBeKilledBy = Config.KILL_BATTLESHIP;
};

Battleship.prototype = new Unit();

Battleship.prototype.attack = function(victim) {
    if (this.canBeKilledBy.indexOf(victim.type) > -1) {
        this.kill();
        return true;
    }
    return victim.harm(this);
};


Battleship.prototype.harm = function(offender) {
    if (this.canBeKilledBy.indexOf(offender.type) > -1) {
        this.kill();
        return true;
    }
};