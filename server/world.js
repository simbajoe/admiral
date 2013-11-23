var Player = require('./player.js');
var Cruiser = require('./unit/cruiser.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.objectsToExport = [];
    this.players = [];
    this.cruisers = [];
    this.uniqueId = 1;
    this.winner = '';
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
    var player = null;
    if (this.players.length == 0
        || this.players[0].homelandLocation != Config.HOMEUP) {
        player = new Player(this.uniqueId, socket, Config.HOMEUP, this);
    } else {
        player = new Player(this.uniqueId, socket, Config.HOMEDOWN, this);
    }
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

World.prototype.isLocationOnMap = function(location) {
    if (location[0] < Config.minWorldX ||
        location[0] > Config.maxWorldX ||
        location[1] < Config.minWorldY ||
        location[1] > Config.maxWorldY) {
        return false;
    }
    return true;
};
