var Player = module.exports = function(id, socket, homeLoc, world) {
    this.socket = socket;
    this.type = 'players';
    this.homelandLocation = homeLoc;
    this.id = id;
    this.world = world;
};

Player.prototype.exportToHash = function() {
    return {
        id: this.id,
        homelandLocation: this.homelandLocation
    };
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
};