var Unit = require('../unit.js');
var Config = require('../../shared/config.js');

var Battleship = module.exports = function(location, owner, world) {
    this.init(location, owner, 'battleship', world);
    this.canBeKilledBy = Config.KILL_BATTLESHIP;
};

Battleship.prototype = new Unit();

Battleship.prototype.attack = function(defender) {
    this.wasInBattle = true;
    if (this.canBeKilledBy.indexOf(defender.type) > -1) {
        this.kill();
        defender.joinBattle();
        return true;
    }
    return defender.harm(this);
};


Battleship.prototype.harm = function(offender) {
    this.wasInBattle = true;
    if (this.canBeKilledBy.indexOf(offender.type) > -1) {
        this.kill();
        return true;
    }
};