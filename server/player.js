var Config = require('../shared/config.js');

var Player = module.exports = function(id, socket, homeLoc, world) {
    this.socket = socket;
    this.type = 'players';
    this.homelandLocation = homeLoc;
    this.id = id;
    this.world = world;
    this.unitsToPlace = Config.unitsToPlace;
};

Player.prototype.exportToHash = function() {
    return {
        id: this.id,
        homelandLocation: this.homelandLocation,
        unitsToPlace: this.unitsToPlace
    };
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
};