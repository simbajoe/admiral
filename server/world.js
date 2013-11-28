var Player = require('./player.js');
var Cells = require('./cells.js');
var Battle = require('./battle.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.objects = [];
    this.players = [];
    this.cells = new Cells();
    this.uniqueId = 1;
    this.phase = Config.PLANNING_PHASE;
    this.currentTurn = null;
    this.returnCurrentTurn = null;
    this.addPlayer(Config.homelandLocation[0]);
    this.addPlayer(Config.homelandLocation[1]);
    this.winner = false;
    this.battle = null;
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
        return null;
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

World.prototype.exportToHash = function() {
    var result = {};
    result.phase = this.phase;
    result.winner = this.winner;
    if (this.phase != Config.PLANNING_PHASE) {
        result.currentTurn = this.currentTurn + 1;
    }
    return result;
};

World.prototype.addUnit = function(owner, type, location) {
    // it's not very good, but we don't have prediction on client
    // so he doesn't really know if the unit was placed
    // and 
    if (this.phase != Config.PLANNING_PHASE) {
        return false;
        /*throw "addUnit: not a planning phase: `" + this.phase + "`";*/
    }
    if (!owner.canPlace(type, location)) {
        return false;
        /*throw "addUnit: can't place: type=`" + type + "`, location=`"*/
        /*+ JSON.stringify(location) + "`, owner: `" + owner.id + "`";*/
    }
    if (this.cells.get(location).getObject()) {
        return false;
        /*throw "addUnit: can't place, already have object: location=`" + JSON.stringify(location) + "`";*/
    }
    if (!location || !type || !owner) {
        throw "addUnit: wrong input: location=`" + JSON.stringify(location) + "`, type=`" + type + "`";
    }
    var unit = owner.addUnit(this.uniqueId, location, type);
    this.objects.push(unit);
    this.uniqueId++;
    this.checkCanEndPlanningPhase();
    return unit;
};

World.prototype.removeUnit = function(unit) {
    this.objects = Utils.deleteFromArrById(unit.id, this.objects);
};

World.prototype.checkCanEndPlanningPhase = function() {
    if (this.players[0].allUnitsPlaced
        && this.players[1].allUnitsPlaced) {
        this.phase = Config.MOVE_PHASE;
        this.currentTurn = Math.round(Math.random());
        return true;
    }
    return false;
};

World.prototype.makeMove = function(unitLocation, newPoint) {
    if (this.phase != Config.MOVE_PHASE) {
        return false;
    }
    var fromCell = this.cells.get(unitLocation);
    var toCell = this.cells.get(newPoint);
    if (fromCell && fromCell.getObject() && toCell) {
        fromCell.getObject().move(toCell);
        this.phase = Config.ATTACK_PHASE;
        return true;
    }
    return false;
};

World.prototype.switchActivePlayer = function() {
    if (this.currentTurn == this.players[0].id) {
        this.currentTurn = this.players[1].id;
        return;
    }
    this.currentTurn = this.players[0].id;
};


World.prototype.makeAttack = function(data) {
    var from = this.cells.get(data.from);
    var offender = from.getObject();
    var to = this.cells.get(data.to);
    var victim = to.getObject();
    if (!from
        || !offender
        || !to
        || !victim) {
        return false;
    }
    var success = from.getObject().attack(victim);
    if (success) {
        this.switchActivePlayer();
        this.phase = Config.MOVE_PHASE;
        return true;
    }
    this.battle = new Battle(offender, victim);
    if (!this.checkBattleFinished()) {
        this.setSupportPhase();
    }
    return true;
};

World.prototype.setSupportPhase = function() {
    this.phase = Config.SUPPORT_PHASE;
    this.returnCurrentTurn = this.currentTurn;
    this.currentTurn = this.battle.currentSupportPlayer.id;
};

World.prototype.checkBattleFinished = function() {
    if (this.battle.winner || this.battle.draw) {
        this.battle = null;
        if (this.returnCurrentTurn) {
            this.currentTurn = this.returnCurrentTurn;
            this.returnCurrentTurn = null;
        }
        this.switchActivePlayer();
        this.phase = Config.MOVE_PHASE;
        return true;
    }
    return false;
};

World.prototype.makeSupport = function(unitLocation) {
    var cell = this.cells.get(unitLocation);
    if (!cell || !cell.getObject()) {
        return false;
    }
    var unit = cell.getObject();
    this.battle.addUnit(unit);
    if (!this.checkBattleFinished()) {
        this.currentTurn = this.battle.currentSupportPlayer.id;
    }
    return true;
};

World.prototype.skipTurn = function() {
    if (this.phase == Config.ATTACK_PHASE) {
        this.phase = Config.MOVE_PHASE;
        this.switchActivePlayer();
        return true;
    }
    if (this.phase == Config.SUPPORT_PHASE) {
        //TODO: add code here
    }
    return false;
};

World.prototype.getPlayerById = function(id) {
    for (var i in this.players) {
        if (this.players[i].id == id) {
            return this.players[i];
        }
    }
};
