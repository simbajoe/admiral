$(function() {
    var socket = io.connect(":" + LocalConfig.port);
    socket.on("update", function (snapshot) {
        var myId = snapshot.myId;
        var player = snapshot.players[myId];
        console.log(player);
    });
});

