var Player = require('./player.js');
var Cell = require('./cell.js');
var Config = require('../shared/config.js');
var Utils = require('../shared/utils.js');

var aircraftCarrier = require('./unit/aircraftCarrier.js');
var battleship = require('./unit/battleship.js');
var cruiser = require('./unit/cruiser.js');
var fireShip = require('./unit/fireShip.js');
var airplane = require('./unit/airplane.js');
var MNB = require('./unit/MNB.js');
var atomicBomb = require('./unit/atomicBomb.js');
var raider = require('./unit/raider.js');
var mine = require('./unit/mine.js');
var destroyer = require('./unit/destroyer.js');
var fixedMine = require('./unit/fixedMine.js');
var cruisingSubmarine = require('./unit/cruisingSubmarine.js');
var patrol = require('./unit/patrol.js');
var torpedo = require('./unit/torpedo.js');
var vedette = require('./unit/vedette.js');
var minesweeper = require('./unit/minesweeper.js');
var submarine = require('./unit/submarine.js');

var units = {
    aircraftCarrier: aircraftCarrier,
    battleship: battleship,
    cruiser: cruiser,
    fireShip: fireShip,
    airplane: airplane,
    MNB: MNB,
    atomicBomb: atomicBomb,
    raider: raider,
    mine: mine,
    destroyer: destroyer,
    fixedMine: fixedMine,
    cruisingSubmarine: cruisingSubmarine,
    patrol: patrol,
    torpedo: torpedo,
    vedette: vedette,
    minesweeper: minesweeper,
    submarine: submarine
};

var World = module.exports = function() {
    this.objectsToExport = [];
    this.players = [];
    this.cells = [];
    this.units = [];
    for (var x = Config.minWorldX; x <= Config.maxWorldX; x++) {
        this.cells[x] = [];
        for (var y = Config.minWorldY; y <= Config.maxWorldX; y++) {
            this.cells[x][y] = new Cell(x,y);
        }
    }
    this.uniqueId = 1;
    this.phase = Config.PLANNING;
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
    result.world = this.exportToHash();
    return result;
};

World.prototype.addPlayer = function(socket) {
    var player = null;
    if (this.players.length == 0
        || !Utils.areArraysEq(this.players[0].homelandLocation, Config.HOMEUP)) {
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
    return !(location[0] < Config.minWorldX ||
        location[0] > Config.maxWorldX ||
        location[1] < Config.minWorldY ||
        location[1] > Config.maxWorldY);
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
    if (this.phase != Config.PLANNING
        || !owner.canPlace(type, location)
        || this.getCell(location).hasObject()) {
        return;
    }
    var unit = new units[type](this.uniqueId, this.getCell(location), owner);
    this.getCell(location).addObject(unit);
    this.units.push(unit);
    this.objectsToExport.push(unit);
    this.uniqueId++;
    return unit;
};

