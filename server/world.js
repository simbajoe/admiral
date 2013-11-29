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
    this.currentPlayerId = null;
    this.returnCurrentPlayerId = null;
    this.currentTurn = 0;
    this.addPlayer(Config.homelandLocation[0]);
    this.addPlayer(Config.homelandLocation[1]);
    this.waitingForPlayerIds = [this.players[0].id, this.players[1].id];
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
        result.currentPlayerId = this.currentPlayerId;
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
    if (owner.allUnitsPlaced) {
        this.waitingForPlayerIds = Utils.deleteFromArrByValue(unit.id, this.waitingForPlayerIds);
        if (this.waitingForPlayerIds.length == 0) {
            this.phase = Config.MOVE_PHASE;
            this.currentPlayerId = Math.random() > 0.5 ? this.players[0].id : this.players[1].id;
        }
    }
    this.checkCanEndPlanningPhase();
    return unit;
};

World.prototype.removeUnit = function(unit) {
    this.objects = Utils.deleteFromArrById(unit.id, this.objects);
};

World.prototype.makeMove = function(unitLocation, newPoint) {
    if (this.phase != Config.MOVE_PHASE) {
        return false;
    }
    var fromCell = this.cells.get(unitLocation);
    var toCell = this.cells.get(newPoint);
    var d = new Date();
    console.log('start searching if can skip attack phase', d.getHours());
    if (fromCell && fromCell.getObject() && toCell) {
        fromCell.getObject().move(toCell);
        if (this.getPlayerById(this.currentPlayerId).canAttack()) {
            this.phase = Config.ATTACK_PHASE;
        } else {
            this.nextTurn();
        }
        console.log('search end',d.getHours());
        return true;
    }
    console.log('search end2',d.getHours());
    return false;
};

World.prototype.nextTurn = function() {
    this.getPlayerById(this.currentPlayerId).endTurn();
    if (this.currentPlayerId == this.players[0].id) {
        this.currentPlayerId = this.players[1].id;
        this.currentTurn++;
        return;
    }
    this.currentPlayerId = this.players[0].id;
};


World.prototype.makeAttack = function(data) {
    var from = this.cells.get(data.from);
    var offender = from.getObject();
    var to = this.cells.get(data.to);
    var victim = to.getObject();
    if (this.phase != Config.ATTACK_PHASE
        || !from
        || !offender
        || !to
        || !victim) {
        return false;
    }
    var success = from.getObject().attack(victim);
    if (success) {
        this.nextTurn();
        this.phase = Config.BATTLE_RESULTS_PHASE;
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
    this.returnCurrentPlayerId = this.currentPlayerId;
    this.currentPlayerId = this.battle.currentSupportPlayer.id;
};

World.prototype.checkBattleFinished = function() {
    if (this.battle.winner || this.battle.draw) {
        this.battle = null;
        if (this.returnCurrentPlayerId) {
            this.currentPlayerId = this.returnCurrentPlayerId;
            this.returnCurrentPlayerId = null;
        }
        this.phase = Config.BATTLE_RESULTS_PHASE;
        return true;
    }
    return false;
};

World.prototype.makeSupport = function(unitLocation) {
    var cell = this.cells.get(unitLocation);
    if (this.phase != Config.SUPPORT_PHASE
        || !cell
        || !cell.getObject()) {
        return false;
    }
    var unit = cell.getObject();
    this.battle.addUnit(unit);
    if (!this.checkBattleFinished()) {
        this.currentPlayerId = this.battle.currentSupportPlayer.id;
    }
    return true;
};

World.prototype.skipTurn = function(player) {
    if (this.phase == Config.ATTACK_PHASE
        || this.phase == Config.BATTLE_RESULTS_PHASE) {
        this.phase = Config.MOVE_PHASE;
        this.nextTurn();
        return true;
    }
    if (this.phase == Config.SUPPORT_PHASE) {
        this.battle.skipSupport(player);
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
