$(function() {

    for (var i = 0; i < 14; i++) {
        var row = $('<div/>', {
                'class': 'row'
            }).appendTo('.map');
        for (var j = 0; j < 14; j++) {
            $('<div/>', {
                'data-row': i,
                'data-col': j,
                'class': 'field'
            }).appendTo(row);
        }
    };

    var socket = io.connect(":" + LocalConfig.port);
    socket.on("update", function (snapshot) {
        var myId = snapshot.myId;
        var player = snapshot.players[myId];
        console.log(snapshot);
    });
});

