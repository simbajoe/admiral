var Player = require('./player.js');
var Cells = require('./cells.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.objects = [];
    this.players = [];
    this.cells = new Cells();
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

World.prototype.addUnit = function(owner, type, location) {
    if (this.phase != Config.PLANNING_PHASE
        || !owner.canPlace(type, location)
        || this.cells.get(location).getObject()
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
    var fromCell = this.cells.get(unitLocation);
    var toCell = this.cells.get(newPoint);
    if (fromCell && fromCell.getObject() && toCell) {
        fromCell.getObject().move(toCell);
        //after move can be attack, move turn can be skipped, though if move turn skipped must be attack
        this.currentTurn++;
        if (this.currentTurn > 1) {
            this.currentTurn = 0;
        }
        return true;
    }
    return false;
};

