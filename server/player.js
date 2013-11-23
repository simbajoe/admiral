var Player = module.exports = function(id, socket, team, world) {
    this.socket = socket;
    this.type = 'players';
    this.team = team;
    this.id = id;
    this.world = world;
    this.balance = 100;
    this.moneyGrowth = 0.002;
};

Player.prototype.exportToHash = function() {
    return {
        id: this.id,
        team: this.team,
        balance: this.balance
    };
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
}

Player.prototype.update = function(dt) {
    this.balance += this.moneyGrowth*dt;
};

Player.prototype.spend = function(amount) {
    if (amount > this.balance) {
        return false;
    }
    this.balance -= amount;
    return true;
};