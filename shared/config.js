(function(exports){
    exports.minWorldX = 0;
    exports.minWorldY = 0;
    exports.maxWorldX = 13;
    exports.maxWorldY = 13;
    exports.linesToBuildShips = 5;
    exports.PLAYER1 = 1;
    exports.PLAYER2 = 2;
    exports.homelandLocation = {
        1: [0, 1, 2, 3, 4],
        2: [13, 12, 11, 10, 9]
    };
    exports.PLANNING_PHASE = 'planning_phase';
    exports.MOVE_PHASE = 'move_phase';
    exports.ATTACK_PHASE = 'attack_phase';
    exports.SUPPORT_PHASE = 'support_phase';
    exports.unitsToPlace = {
        aircraftCarrier: 1, //A
        battleship: 2, //l
        cruiser: 6, //kr
        fireShip: 1, //special attack&harm
        airplane: 1, //C; special attack&harm
        MNB: 2, //vmb; special attack&harm
        atomicBomb: 1, //ab; special attack&harm
        raider: 2, //p
        mine: 6, //m; special attack&harm
        destroyer: 6, //es
        fixedMine: 1, //sm; special attack&harm
        cruisingSubmarine: 1, //krpl
        patrol: 6, //st
        torpedo: 6, //t; special attack&harm
        vedette: 6, //tk
        minesweeper: 6, //tr
        submarine: 6 //pl
    };
    exports.MOVE_MINE_SHIP = 'destroyer';
    exports.MOVE_AIRPLANE_SHIP = 'aircraftCarrier';
    exports.MOVE_TORPEDO_SHIP = 'vedette';
    exports.KILL_MINE = 'minesweeper';
    exports.possibleGroups = [
        {
            units: ['submarine'],
            fireValue: 1
        },
        {
            units: ['minesweeper'],
            fireValue: 2
        },
        {
            units: ['submarine', 'submarine'],
            fireValue: 3
        },
        {
            units: ['minesweeper', 'minesweeper'],
            fireValue: 4
        },
        {
            units: ['vedette'],
            fireValue: 5
        },
        {
            units: ['submarine', 'submarine', 'submarine'],
            fireValue: 6
        },
        {
            units: ['minesweeper', 'minesweeper', 'minesweeper'],
            fireValue: 7
        },
        {
            units: ['vedette', 'vedette'],
            fireValue: 8
        },
        {
            units: ['cruisingSubmarine'],
            fireValue: 9
        },
        {
            units: ['patrol'],
            fireValue: 10
        },
        {
            units: ['vedette', 'vedette', 'vedette'],
            fireValue: 11
        },
        {
            units: ['patrol', 'cruisingSubmarine'],
            fireValue: 12
        },
        {
            units: ['destroyer'],
            fireValue: 13
        },
        {
            units: ['patrol', 'patrol'],
            fireValue: 14
        },
        {
            units: ['raider'],
            fireValue: 15
        },
        {
            units: ['patrol', 'patrol', 'cruisingSubmarine'],
            fireValue: 16
        },
        {
            units: ['cruiser'],
            fireValue: 17
        },
        {
            units: ['destroyer', 'destroyer'],
            fireValue: 18
        },
        {
            units: ['patrol', 'patrol', 'patrol'],
            fireValue: 18 //eq 2destroyer
        },
        {
            units: ['raider', 'destroyer'],
            fireValue: 19
        },
        {
            units: ['destroyer', 'destroyer', 'destroyer'],
            fireValue: 20
        },
        {
            units: ['raider', 'raider'],
            fireValue: 21
        },
        {
            units: ['battleship'],
            fireValue: 22
        },
        {
            units: ['cruiser', 'cruiser'],
            fireValue: 23
        },
        {
            units: ['raider', 'destroyer', 'destroyer'],
            fireValue: 24
        },
        {
            units: ['raider', 'raider', 'destroyer'],
            fireValue: 24 //eq 2destr + raider
        },
        {
            units: ['aircraftCarrier'],
            fireValue: 25
        },
        {
            units: ['cruiser', 'cruiser', 'cruiser'],
            fireValue: 26
        },
        {
            units: ['battleship', 'battleship'],
            fireValue: 27
        }
    ];
})(typeof exports === 'undefined'? this['Config']={}: exports);