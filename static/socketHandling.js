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
        }
      }
      togglePageContent();
      game.start();
      break;
    case "newPlayerJoined": //The server is telling me a new players has connected
      if(msg.player.id != player.id){
        game.addPlayer(msg.player);
        if(Object.keys(game.players).length === 2){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          game.reset();
      }
    }
      break;
    case "playerMoved": //A player changed his direction
      var sprite = game.players[msg.playerID].sprite;
      sprite.direction = msg.direction;
      sprite.image.src = "/sprites/images/" + game.bikes[sprite.color].imagePrefix + sprite.direction + ".png";
      
      break;
    case "gameFull":
      gameFull();
      break;
    case "nameTaken":
      nameTaken();
      break;
  }
}
