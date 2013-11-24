var Config = require('../../shared/config.js');

var unitDic = {
    aC: 'aircraftCarrier', // 1
    b : 'battleship', // 2
    c : 'cruiser', // 6
    fS: 'fireShip', // 1
    a : 'airplane', // 1
    B : 'MNB', // 2
    aB: 'atomicBomb', // 1
    r : 'raider', // 2
    m : 'mine', // 6
    d : 'destroyer', // 6
    fM: 'fixedMine', // 1
    cS: 'cruisingSubmarine', // 1
    p : 'patrol', // 6
    t : 'torpedo', // 6
    v : 'vedette', // 6
    mS: 'minesweeper', // 6
    s : 'submarine' // 6
};

var source = [
"+-----------------------------------------------+",
"|   | 0  1  2  3  4  5  6  7  8  9  10 11 12 13 |",
"|---+-------------------------------------------|",
"|0  | aC .  mS b  s  s  B  .  .  .  s  s  p  p  |",
"|1  | a  d  mS m  b  v  v  s  t  v  t  .  B  p  |",
"|2  | d  m  mS m  d  t  t  d  s  v  r  .  .  p  |",
"|3  | m  mS mS mS .  m  d  cS v  c  .  r  v  p  |",
"|4  | c  c  c  fS .  fM m  d  t  c  c  aB t  p  |",
"|5  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|6  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|7  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|8  | .  .  .  .  .  .  .  .  .  .  .  .  .  .  |",
"|9  | aC .  mS b  s  s  B  .  .  .  s  s  p  p  |",
"|10 | a  d  mS m  b  v  v  s  t  v  t  .  B  p  |",
"|11 | d  m  mS m  d  t  t  d  s  v  r  .  .  p  |",
"|12 | m  mS mS mS .  m  d  cS v  c  .  r  v  p  |",
"|13 | c  c  c  fS .  fM m  d  t  c  c  aB t  p  |",
"+-----------------------------------------------+"
];

(function(exports){
    exports.units = {
    };

    var p1 = [];
    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 14; x++) {
            var u = source[y + 3].slice(x * 3 + 6, x * 3 + 9).trim();
            if (u in unitDic) {
                p1.push([unitDic[u], [x, y]]);
            }
        }
    }
    exports.units[Config.PLAYER1] = p1;
    var p2 = [];
    for (var y = 9; y < 14; y++) {
        for (var x = 0; x < 14; x++) {
            var u = source[y + 3].slice(x * 3 + 6, x * 3 + 9).trim();
            if (u in unitDic) {
                p2.push([unitDic[u], [x, y]]);
            }
        }
    }
    exports.units[Config.PLAYER2] = p2;

})(typeof exports === 'undefined'? this['Fixture']={}: exports);



