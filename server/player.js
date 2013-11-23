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

var units = {
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

var Player = module.exports = function(id, homeLoc, world) {
    this.units = [];
    this.homelandLocation = Utils.copyArray(homeLoc);
    this.id = id;
    this.world = world;
    this.allUnitsPlaced = false;
    this.unitsToPlace = Utils.copyOneStoryHash(Config.unitsToPlace);
};

Player.prototype.exportToHash = function() {
    var result = {
        id: this.id,
        homelandLocation: this.homelandLocation,
        unitsToPlace: this.unitsToPlace,
        units: {}
    };
    for (var i in this.units) {
        result.units[this.units[i].id] = this.units[i].exportToHash();
    }
    if (this.world.phase == Config.PLANNING_PHASE) {
        result.freeCells = [];
        for (var i in this.homelandLocation) {
            var y = parseInt(this.homelandLocation[i]);
            for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
                if (!this.world.cells[x][y].hasObject()) {
                    result.freeCells.push([x,y]);
                }
            }
        }
    }
    return result;
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
};

Player.prototype.canPlace = function(type) {
    console.log(this.unitsToPlace[type]);
    return this.unitsToPlace[type] > 0;
};

Player.prototype.checkAllUnitsPlaced = function() {
    for (var i in this.unitsToPlace) {
        if (this.unitsToPlace[i] > 1) {
            return false;
        }
    }
    return this.allUnitsPlaced = true;
};

Player.prototype.addUnit = function(id, location, type) {
    var unit = new units[type](id, this.world.getCell(location), this, this.world);
    this.unitsToPlace[type]--;
    this.units.push(unit);
    this.checkAllUnitsPlaced();
    return unit;
};

Player.prototype.addSocket = function(socket) {
    this.socket = socket;
};

Player.prototype.removeSocket = function(socket) {
    this.socket = null;
};
