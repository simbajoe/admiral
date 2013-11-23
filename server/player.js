var Player = module.exports = function(id, socket, team, world) {
    this.socket = socket;
    this.type = 'players';
    this.id = id;
    this.world = world;
};

Player.prototype.exportToHash = function() {
    return {
        id: this.id
    };
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
};