var Player = require('./player.js');
var Config = require('../shared/config.js');

var World = module.exports = function() {
    this.objectsToExport = [];
    this.players = [];
    this.uniqueId = 1;
    this.worldGenerated = false;
    this.worldGenerated = true;
    this.winner = '';
};

World.prototype.getNewPlayerTeam = function() {
    var red = 0, blue = 0;
    for (var id in this.players) {
        if (this.players[id].team == 'red') {
            red++;
        } else {
            blue++;
        }
    }
    return blue > red ? 'red' : 'blue';
};

World.prototype.getHash = function() {
    var id;
    var result = {};
    for (var num in this.objectsToExport) {
        var object = this.objectsToExport[num];
        if (typeof(result[object.type]) === 'undefined') {
            result[object.type] = {};
        }
        result[object.type][object.id] = object.exportToHash();
    }
    return result;
};

World.prototype.addPlayer = function(socket) {
    var team = this.getNewPlayerTeam();
    var player = new Player(this.uniqueId, socket, team, this);
    this.players.push(player);
    this.objectsToExport.push(player);
    this.uniqueId++;
    return player;
};

World.prototype.removePlayer = function(player) {
    this.players = Utils.deleteFromArrById(player.id, this.players);
    this.objectsToExport = Utils.deleteFromArrById(player.id, this.objectsToExport);
};

World.prototype.getObjectById = function(id) {
    for (var i in this.objectsToExport) {
        if (this.objectsToExport[i].id == id) {
            return this.objectsToExport[i];
        }
    }
    return null;
};

World.prototype.destroyObject = function(object) {
    this.objectsToExport = Utils.deleteFromArrById(object.id, this.objectsToExport);
    this.objectsOnMap = Utils.deleteFromArrById(object.id, this.objectsOnMap);
    this[object.type] = Utils.deleteFromArrById(object.id, this[object.type]);
};

World.prototype.getNeighbors = function(point) {
    var neighbors = [];
    var newPoints = [
        [point[0] - 1, point[1]],
        [point[0] + 1, point[1]],
        [point[0], point[1] - 1],
        [point[0], point[1] + 1],
        [point[0] - 1, point[1] + 1],
        [point[0] - 1, point[1] - 1],
        [point[0] + 1, point[1] + 1],
        [point[0] + 1, point[1] - 1]
    ];
    var me = this;
    newPoints.forEach(function(newPoint) {
        if (me.isLocationOnMap(newPoint)) {
            neighbors.push(newPoint);
        }
    });
    return neighbors;
};