var WSServer = require('ws').Server
var http = require('http')
var express = require('express')
var Game = require('./gameServer.js').Game
var Player = require('./playerServer.js').Player
var Unit = require('./unitServer.js').Unit
var app = express()
var port = process.env.PORT || 3000
var games = {}

app.use(express.static(__dirname + '/static'))

var server = http.createServer(app)
server.listen(port)

var wss = new WSServer({server: server})

wss.on("connection", function(ws){
  ws.on("message", function(data){
    var msg = JSON.parse(data)
    var dataToSend

    switch(msg.code){
      case "connectionDemand": // ------------------------- Someone trying to connect to a game
        if(!games[msg.gameID]){// ---------- If it doesn't exist, create the game
          games[msg.gameID] = new Game({
            id: msg.gameID,
            playersMax: 6
          })
        } else {// ----------------------------- Say if the game is full
          if(Object.keys(games[msg.gameID].players).length === games[msg.gameID].playersMax){
            ws.send(JSON.stringify({code: "gameFull"}))
            return
          }
        }
// --------------------------- If the game is not full, send everyone the datas
        // First, assign the game to this connection
        this.game = games[msg.gameID]
        // Then, create the player
        if(!this.game.players[msg.playerID]){
          this.game.players[msg.playerID] = new Player({
            id: msg.playerID,
            conn: this,
            direction: "left",
            x: 50,
            y: 50,
            wall: [["left"],[50,50]],
            speed: 1
          })
        } else {
        // If the name is already taken, tell it
          ws.send(JSON.stringify({code: "nameTaken"}));
          return
        }
        // Assign the player to this connection
        this.playerID = msg.playerID
        this.player = this.game.players[this.playerID]

        ws.send(JSON.stringify({
          code: "gameInfos",
          player: this.game.getFormattedPlayer(this.playerID),
          playersNumber: Object.keys(this.game.players).length,
          playersMax : this.game.playersMax,
          gameID: this.game.id,
          players: this.game.getFormattedAllPlayers()
        }))

        broadcastToPlayers(this.game, {
          code: "newPlayerJoined",
          player: this.game.getFormattedPlayer(this.playerID)
        })
        
        if(Object.keys(this.game.players).length === 2){
          this.game.start();
        }
        break
      case "playerMoved":// ----------------- Someone has changed his direction
        this.player.direction = msg.direction
        broadcastToPlayers(this.game, {
          code: "playerMoved", 
          direction: msg.direction,
          x: this.game.players[msg.playerID].x,
          y: this.game.players[msg.playerID].y,
          playerID: msg.playerID
        })
        break
    }
  })

  ws.on("close", function(){
    if(this.playerID){
      delete this.game.players[this.playerID]
      if(Object.keys(this.game.players).length < 1){
        delete games[this.game.id]
      }
      delete this.game
      delete this.playerID
    }
  })

})

var broadcastToPlayers = function(game, data){
  for(player in game.players){
    game.players[player].conn.send(JSON.stringify(data))
  }
}
