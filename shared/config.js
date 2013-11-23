(function(exports){
    exports.minWorldX = 0;
    exports.minWorldY = 0;
    exports.maxWorldX = 14;
    exports.maxWorldY = 14;
    exports.linesToBuildShips = 5;
    exports.HOMEUP = 'up';
    exports.HOMEDOWN = 'down';
    exports.unitsToBuild = {
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
})(typeof exports === 'undefined'? this['Config']={}: exports);