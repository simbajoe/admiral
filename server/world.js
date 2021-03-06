var Player = require('./player.js');
var Cells = require('./cells.js');
var Battle = require('./battle.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var World = module.exports = function() {
    this.players = [];
    this.cells = new Cells();
    this.uniqueId = 1;
    this.setPhase(Config.PLANNING_PHASE);
    this.currentPlayerId = null;
    this.returnCurrentPlayerId = null;
    this.currentTurn = 0;
    this.addPlayer(Config.homelandLocation[0]);
    this.addPlayer(Config.homelandLocation[1]);
    this.waitingForPlayerIds = [this.players[0].id, this.players[1].id];
    this.winner = false;
    this.battle = null;
};

World.prototype.getSnapshot = function(player) {
    var result = {
        myId: player.id,
        players: {},
        world: {}
    };
    for (var i in this.players) {
        result.players[this.players[i].id] = this.players[i].exportToSnapshot(player, this.phase, this.winner);
    }
    result.world = this.exportToSnapshot(player);
    return result;
};

World.prototype.addPlayer = function(homeland) {
    if (this.players.length > 1) {
        return null;
    }
    var player = new Player(this.uniqueId, homeland, this);
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

World.prototype.exportToSnapshot = function(player) {
    var result = {};
    result.phase = this.phase;
    if (this.winner) {
        result.winner = this.winner.id;
    }
    if (this.phase == Config.PLANNING_PHASE
        || this.phase == Config.BATTLE_RESULTS_PHASE) {
        result.waitingForPlayerIds = this.waitingForPlayerIds;
    } else {
        result.currentPlayerId = this.currentPlayerId;
    }
    if (this.phase == Config.BATTLE_RESULTS_PHASE
        && this.battle && this.battle.draw) {
        result.unitsReplaced = this.battle.unitsReplaced;
    }
    return result;
};

World.prototype.setPhase = function (phase) {
    this.phase = phase;
};

World.prototype.addUnit = function(owner, command) {
    var type = command.params.type;
    var location = command.params.location;
    // it's not very good, but we don't have prediction on client
    // so he doesn't really know if the unit was placed
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
    var unit = owner.addUnit(location, type);
    if (owner.allUnitsPlaced) {
        this.waitingForPlayerIds = Utils.deleteFromArrByValue(owner.id, this.waitingForPlayerIds);
        if (this.waitingForPlayerIds.length == 0) {
            this.setPhase(Config.MOVE_PHASE);
            this.currentPlayerId = Math.random() > 0.5 ? this.players[0].id : this.players[1].id;
        }
    }
    return unit;
};

World.prototype.moveUnit = function(player, command) {
    var unitLocation = command.params.from;
    var newPoint = command.params.to;
    var fromCell = this.cells.get(unitLocation);
    var toCell = this.cells.get(newPoint);
    if (this.phase != Config.MOVE_PHASE
        || !fromCell
        || !fromCell.getObject()
        || fromCell.getObject().owner.id != player.id
        || !toCell) {
        return false;
    }
    this.getEnemy(player).clearPreviousLocation();
    fromCell.getObject().move(toCell);
    if (this.getPlayerById(this.currentPlayerId).canAttack()) {
        this.setPhase(Config.ATTACK_PHASE);
    } else {
        this.nextTurn();
    }
    return true;
};

World.prototype.nextTurn = function() {
    for (var i in this.players) {
        this.players[i].endTurn();
    }
    var player = this.getPlayerById(this.currentPlayerId);
    this.currentPlayerId = this.getEnemy(player).id;
    this.currentTurn++;
};

World.prototype.attackUnit = function(player, command) {
    var from = this.cells.get(command.params.from);
    var offender = from.getObject();
    var to = this.cells.get(command.params.to);
    var defender = to.getObject();
    if (this.phase != Config.ATTACK_PHASE
        || !from
        || !offender
        || offender.owner.id != player.id
        || !to
        || !defender) {
        return false;
    }
    var success = offender.attack(defender);
    if (success) {
        this.setBattleResultsPhase();
        return true;
    }
    this.battle = new Battle(offender, defender);
    if (!this.checkBattleFinished()) {
        this.setSupportPhase();
    }
    return true;
};

World.prototype.setBattleResultsPhase = function() {
    this.setPhase(Config.BATTLE_RESULTS_PHASE);
    this.waitingForPlayerIds = [this.players[0].id, this.players[1].id];
};

World.prototype.setSupportPhase = function() {
    this.setPhase(Config.SUPPORT_PHASE);
    this.returnCurrentPlayerId = this.currentPlayerId;
    this.currentPlayerId = this.battle.currentSupportPlayer.id;
};

World.prototype.checkBattleFinished = function() {
    if (this.battle.winner || this.battle.draw) {
        this.setBattleResultsPhase();
        return true;
    }
    return false;
};

World.prototype.supportUnit = function(player, command) {
    var unitPoint = command.params.target;
    var cell = this.cells.get(unitPoint);
    if (this.phase != Config.SUPPORT_PHASE
        || !cell
        || !cell.getObject()
        || cell.getObject().owner.id != player.id) {
        return false;
    }
    var unit = cell.getObject();
    this.battle.addUnit(unit);
    this.updateSupportPhase();
    return true;
};

World.prototype.updateSupportPhase = function() {
    if (!this.checkBattleFinished()) {
        this.currentPlayerId = this.battle.currentSupportPlayer.id;
    }
};

World.prototype.endBattleResultsPhase = function() {
    this.setPhase(Config.MOVE_PHASE);
    for (var i in this.players) {
        this.players[i].updateUnitsAfterBattle();
        if (this.players[i].lost) {
            this.winner = this.getEnemy(this.players[i]);
        }
    }
    this.battle = null;
    if (this.winner) {
        return;
    }
    if (this.returnCurrentPlayerId) {
        this.currentPlayerId = this.returnCurrentPlayerId;
        this.returnCurrentPlayerId = null;
    }
    this.nextTurn();
};

World.prototype.getEnemy = function(player) {
    if (player.id == this.players[0].id) {
        return this.players[1];
    }
    return this.players[0];
};

World.prototype.skipTurn = function(player, command) {
    if (this.phase == Config.ATTACK_PHASE) {
        this.setPhase(Config.MOVE_PHASE);
        this.nextTurn();
        return true;
    }
    if (this.phase == Config.BATTLE_RESULTS_PHASE) {
        this.waitingForPlayerIds = Utils.deleteFromArrByValue(player.id, this.waitingForPlayerIds);
        if (this.waitingForPlayerIds.length == 0) {
            this.endBattleResultsPhase();
        }
        return true;
    }
    if (this.phase == Config.SUPPORT_PHASE) {
        this.battle.skipSupport(player);
        this.updateSupportPhase();
        return true;
    }
    return false;
};

World.prototype.notifyHover = function(player, command) {
    this.getEnemy(player).send({type: 'hover', player_id: player.id, field: command.params.target});
    return false;
};

World.prototype.getPlayerById = function(id) {
    for (var i in this.players) {
        if (this.players[i].id == id) {
            return this.players[i];
        }
    }
};

World.prototype.displaceUnit = function(player, command) {
    var cell = this.cells.get(command.params.target);
    if (this.phase != Config.PLANNING_PHASE
        || !cell.getObject()
        || cell.getObject().owner.id != player.id) {
        return false;
    }
    player.displaceUnit(cell.getObject());
    return true;
};
