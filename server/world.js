var Player = require('./player.js');
var Cell = require('./cell.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.objectsToExport = [];
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

World.prototype.addPlayer = function(socket) {
    var player = null;
    if (this.players.length == 0
        || !Utils.areArraysEq(this.players[0].homelandLocation, Config.HOME_UP)) {
        player = new Player(this.uniqueId, socket, Config.HOME_UP, this);
    } else {
        player = new Player(this.uniqueId, socket, Config.HOME_DOWN, this);
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

World.prototype.exportToHash = function() {
    return {
        phase: this.phase
    };
};

World.prototype.getCell = function(location) {
    return this.cells[location[0]][location[1]];
};


World.prototype.addUnit = function(owner, type, location) {
    if (this.phase != Config.PLANNING_PHASE
        || !owner.canPlace(type, location)
        || this.getCell(location).hasObject()) {
        console.log(owner.id, 'tried to place', type);
        console.log(this.phase != Config.PLANNING_PHASE, owner.canPlace(type, location), this.getCell(location).hasObject());
        console.log(this.phase);
        return null;
    }
    var unit = owner.addUnit(this.uniqueId, location, type);
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
        return true;
    }
};

