var host = location.origin.replace(/^http/, 'ws');
var socket = new WebSocket(host);

socket.onmessage = function(e){
  var msg = JSON.parse(e.data);
  switch (msg.code){
    // After someone sent datas to the websocket, he first receives something
    // enabling him/her to connect to the game.
    case "gameInfos": //The server is sending me back my game infos
      if(!player){
        player = game.addPlayer(msg.player, colorChosen);
      }
      for(pl in msg.players){
        // Don't re create it if it's the current player
        if(pl != player.id){
          game.addPlayer(msg.players[pl]);
          game.drawWall(msg.players[pl].wall, game.players[pl].bikeColor);
        }
      }
      togglePageContent();
      break;
    case "newPlayerJoined": //The server is telling me a new players has connected
      if(msg.player.id != player.id) {
        game.addPlayer(msg.player);
        if(Object.keys(game.players).length === 2){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      break;
    case "newGameState":
      var p;
      for(p in msg.players){
        game.players[p].update(msg.players[p]);
      }

      break;
    case "Collision":
      game.players[msg.playerID].laMuerta();
      break;
    case "reset":
      game.reset(msg.players);
      break;
    case "gameFull":
      gameFull();
      break;
    case "nameTaken":
      nameTaken();
      break;
    case "ghostEnd":
      game.players[msg.playerID].ghost = false;
      game.players[msg.playerID].previousPlaces = [];
      break;
    case "draw":
      game.draw();
      break;
    case "win":
      game.won(msg.playerID);
      break;
    case "findGame":
      document.querySelector(".gameID").setAttribute('value', msg.gameID);
      break;
  }
}
