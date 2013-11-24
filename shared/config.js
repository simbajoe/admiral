(function(exports){
    exports.minWorldX = 0;
    exports.minWorldY = 0;
    exports.maxWorldX = 13;
    exports.maxWorldY = 13;
    exports.linesToBuildShips = 5;
    exports.HOME_UP = [0, 1, 2, 3, 4];
    exports.HOME_DOWN = [13, 12, 11, 10, 9];
    exports.PLANNING_PHASE = 'planning_phase';
    exports.MOVE_PHASE = 'move_phase';
    exports.unitsToPlace = {
        aircraftCarrier: 1,
        battleship: 2,
        cruiser: 6,
        fireShip: 1,
        airplane: 1,
        MNB: 2,
        atomicBomb: 1,
        raider: 2,
        mine: 6,
        destroyer: 6,
        fixedMine: 1,
        cruisingSubmarine: 1,
        patrol: 6,
        torpedo: 6,
        vedette: 6,
        minesweeper: 6,
        submarine: 6
    };
    exports.MOVE_MINE_SHIP = 'destroyer';
    exports.MOVE_AIRPLANE_SHIP = 'aircraftCarrier';
    exports.MOVE_TORPEDO_SHIP = 'vedette';
})(typeof exports === 'undefined'? this['Config']={}: exports);