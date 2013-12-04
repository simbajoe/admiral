var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var AircraftCarrier = require('./unit/aircraftCarrier.js');
var Battleship = require('./unit/battleship.js');
var Cruiser = require('./unit/cruiser.js');
var FireShip = require('./unit/fireShip.js');
var Airplane = require('./unit/airplane.js');
var MNB = require('./unit/MNB.js');
var AtomicBomb = require('./unit/atomicBomb.js');
var Raider = require('./unit/raider.js');
var Mine = require('./unit/mine.js');
var Destroyer = require('./unit/destroyer.js');
var FixedMine = require('./unit/fixedMine.js');
var CruisingSubmarine = require('./unit/cruisingSubmarine.js');
var Patrol = require('./unit/patrol.js');
var Torpedo = require('./unit/torpedo.js');
var Vedette = require('./unit/vedette.js');
var Minesweeper = require('./unit/minesweeper.js');
var Submarine = require('./unit/submarine.js');

var unitsClasses = {
    aircraftCarrier: AircraftCarrier,
    battleship: Battleship,
    cruiser: Cruiser,
    fireShip: FireShip,
    airplane: Airplane,
    MNB: MNB,
    atomicBomb: AtomicBomb,
    raider: Raider,
    mine: Mine,
    destroyer: Destroyer,
    fixedMine: FixedMine,
    cruisingSubmarine: CruisingSubmarine,
    patrol: Patrol,
    torpedo: Torpedo,
    vedette: Vedette,
    minesweeper: Minesweeper,
    submarine: Submarine
};

var Player = module.exports = function(id, homeland, world) {
    this.units = [];
    this.homelandLocation = Utils.cloneArray(homeland);
    this.id = id;
    this.world = world;
    this.allUnitsPlaced = false;
    this.lost = false;
    this.unitsToPlace = Utils.cloneOneStoryHash(Config.unitsToPlace);
};

Player.prototype.endTurn = function() {
    for (var i in this.units) {
        this.units[i].endTurn();
    }
};

Player.prototype.canAttack = function() {
    for (var i in this.units) {
        this.units[i].setWhereAttack();
        if (this.units[i].whereCanAttack.length > 0) {
            return true;
        }
    }
    return false;
};

Player.prototype.exportToSnapshot = function(forPlayer, phase, gameOver) {
    var result = {
        id: this.id,
        homelandLocation: this.homelandLocation,
        units: []
    };
    if (forPlayer.id == this.id
        && phase== Config.PLANNING_PHASE) {
        result.unitsToPlace = this.unitsToPlace;
    }
    for (var i in this.units) {
        result.units.push(this.units[i].exportToSnapshot(forPlayer, gameOver));
    }
    if (forPlayer.id == this.id
        && phase == Config.PLANNING_PHASE) {
        result.freeCells = [];
        for (var i in this.homelandLocation) {
            var y = parseInt(this.homelandLocation[i]);
            for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
                if (!this.world.cells.get([x,y]).getObject()) {
                    result.freeCells.push([x,y]);
                }
            }
        }
    }
    if (forPlayer.id == this.id
        && this.world.phase == Config.SUPPORT_PHASE
        && this.world.battle.currentSupportPlayer.id == this.id) {
        result.supportCells = [];
        var supportCells = this.world.battle.getSupportCells();
        for (var i in supportCells) {
            result.supportCells.push(supportCells[i].getPoint());
        }
    }
    return result;
};

Player.prototype.send = function(message) {
    if (this.socket) {
        this.socket.emit("update", message);
    }
};

Player.prototype.canPlace = function(type) {
    return this.unitsToPlace[type] > 0;
};

Player.prototype.checkAllUnitsPlaced = function() {
    for (var i in this.unitsToPlace) {
        if (this.unitsToPlace[i] > 0) {
            return false;
        }
    }
    return this.allUnitsPlaced = true;
};

Player.prototype.addUnit = function(location, type) {
    var unit = new unitsClasses[type](this.world.cells.get(location), this, this.world);
    this.unitsToPlace[type]--;
    this.units.push(unit);
    this.checkAllUnitsPlaced();
    return unit;
};

Player.prototype.displaceUnit = function(unit) {
    this.unitsToPlace[unit.type]++;
    unit.destroy();
};

Player.prototype.addSocket = function(socket) {
    this.socket = socket;
};

Player.prototype.removeSocket = function(socket) {
    this.socket = null;
};

Player.prototype.removeUnit = function(unit) {
    this.units = Utils.deleteFromArrById(unit.id, this.units);
};

Player.prototype.updateUnitsAfterBattle = function() {
    var numOfBases = 0;
    var numOfMovableUnits = 0;
    i = this.units.length;
    while (i--) {
        if (!this.units[i].isAlive) {
            this.units[i].destroy();
            continue;
        } else {
            if (this.units[i].type == Config.BASE) {
                numOfBases++;
            }
            if (this.units[i].maxDistance > 0) {
                numOfMovableUnits++;
            }
        }
    }
    this.lost = numOfBases <= 0 || numOfMovableUnits <= 0;
};
