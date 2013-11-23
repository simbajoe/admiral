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

var Player = module.exports = function(id, socket, homeLoc, world) {
    this.socket = socket;
    this.units = [];
    this.type = 'players';
    this.homelandLocation = homeLoc;
    this.id = id;
    this.world = world;
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
    return result;
};

Player.prototype.broadcast = function(hash) {
    if (this.socket) {
        this.socket.emit("update", hash);
    }
};

Player.prototype.canPlace = function(type) {
    return this.unitsToPlace[type] > 0;
};

Player.prototype.addUnit = function(id, location, type) {
    var unit = new units[type](id, this.world.getCell(location), this);
    this.unitsToPlace[type]--;
    this.world.getCell(location).addObject(unit);
    this.units.push(unit);
    return unit;
};