var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var gameModule = require('./game');


var lobby = new gameModule.Lobby();
var connectedSocket = 0;
var listOfPlayers = [];


app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
/*
app.post('/', function(req, res){
    // Authentication
    if(connectedSocket >4)
    {
        return;
    }
    console.log(req.body);
    listOfPlayers.push(req.body.username);
}); 
*/

io.on('connection', function(socket){
    if(connectedSocket >4)
    {
        return;
    }

    connectedSocket++;
    //console.log(connectedSocket);
    
    io.emit("new player joined", { playerNumber : connectedSocket});
    
    //console.log(connectedSocket);

    socket.on('login', function(data){
        console.log("RECEIVED USERNAME FROM EMIT" + data.username);
        lobby.addPlayer(data.username, socket); // here i dont know if socket.id or directly socket
        listOfPlayers.push(data.username);
        if(lobby.getNumberOfPlayers() == 4){
            console.log("GAME START!");
            io.emit('game start', { players : listOfPlayers });
            var lista = lobby.getPlayerPool();
            console.log(lista[0].username + " " + lista[0].ioSocket);
            console.log(lista[1].username + " " + lista[1].ioSocket);
            console.log(lista[2].username + " " + lista[2].ioSocket);
            console.log(lista[3].username + " " + lista[3].ioSocket);

            var game = new gameModule.Game(lista[0], lista[1], lista[2], lista[3]);
            game.assignCardsToPlayers();
            for (var [username, player] of game.getPlayers()){
                player.ioSocket.emit("game_start", {
                    "players" : listOfPlayers,
                    "cards" : player.getCards()
                });
            }
        };
    });

    socket.on('disconnect', function()
    {
        connectedSocket--;
        io.emit("player left", {playerNumber : connectedSocket});
        console.log('a user disconnect');
    });



});

http.listen(3000, function(){
    console.log('listening on *:3000');
});