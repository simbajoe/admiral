var Player = require('./player.js');
var Cell = require('./cell.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.objects = [];
    this.players = [];
    this.cells = [];
    for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
        this.cells[x] = [];
        for (var y = Config.minWorldY; y <= Config.maxWorldX; y++) {
            this.cells[x][y] = new Cell(x,y);
        }
    }
    this.uniqueId = 1;
    this.phase = Config.PLANNING_PHASE;
    this.currentTurn = null;
    this.addPlayer(Config.HOME_UP);
    this.addPlayer(Config.HOME_DOWN);
    this.winner = '';
};

World.prototype.getHash = function() {
    var id;
    var result = {
        players: {},
        world: {}
    };
    for (var i in this.players) {
        result.players[this.players[i].id] = this.players[i].exportToHash();
    }
    result.world = this.exportToHash();
    return result;
};

World.prototype.addPlayer = function(homeland) {
    if (this.players.length > 1) {
        return;
    }
    var player = new Player(this.uniqueId, homeland, this);
    this.objects.push(player);
    this.players.push(player);
    this.uniqueId++;
    return player;
};

World.prototype.getPlayerWithoutSocket = function() {
    for (var i in this.players) {
        if (!this.players[i].socket) {
            return this.players[i];
        }
    }
    return null;
};

World.prototype.removePlayer = function(player) {
    this.players = Utils.deleteFromArrById(player.id, this.players);
};

World.prototype.exportToHash = function() {
    var result = {};
    result.phase = this.phase;
    if (this.phase != Config.PLANNING_PHASE) {
        result.currentTurn = this.players[this.currentTurn].id;
    }
    return result;
};

World.prototype.getCell = function(location) {
    if (this.cells[location[0]] === undefined
        || this.cells[location[0]][location[1]] === undefined) {
        return null;
    }
    return this.cells[location[0]][location[1]];
};


World.prototype.addUnit = function(owner, type, location) {
    if (this.phase != Config.PLANNING_PHASE
        || !owner.canPlace(type, location)
        || this.getCell(location).getObject()
        || !location
        || !type
        || !owner) {
        return null;
    }
    var unit = owner.addUnit(this.uniqueId, location, type);
    this.objects.push(unit);
    this.uniqueId++;
    this.checkCanEndPlanningPhase();
    return unit;
};

World.prototype.checkCanEndPlanningPhase = function() {
    if (this.players.length < 2) {
        return false;
    }
    if (this.players[0].allUnitsPlaced
        && this.players[1].allUnitsPlaced) {
        this.phase = Config.MOVE_PHASE;
        this.currentTurn = Math.round(Math.random());
        return true;
    }
};

World.prototype.makeMove = function(unitLocation, newPoint) {
    var cell = this.getCell(command.params.from);
    if (cell && cell.getObject()) {
        cell.getObject().move(command.params.to);
        this.currentTurn++;
        if (this.currentTurn > 1) {
            this.currentTurn = 0;
        }
        return true;
    }
    return false;
};

