function Game(can, pl, ctx){
  this.id;
  this.canvas = can;
  this.playerList = pl;
  this.ctx = ctx;
  this.players = {};
  this.bikes = {
    green: {
      taken: false
    },
    red: {
      taken: false
    },
    blue:{
      taken: false
    },
    purple: {
      taken: false
    },
    yellow: {
      taken: false
    },
    orange: {
      taken: false
    }
  }
}

Game.prototype.reset = function(players){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  while(this.playerList.hasChildNodes()){
    this.playerList.removeChild(this.playerList.lastChild);
  }
  var pl;
  var playerRow;
  for(pl in players){
    if(!this.players[pl]){
      delete this.players[pl]
      continue
    }
    this.players[pl].ghost = true;
    playerRow = document.createElement('p');
    playerRow.innerHTML = pl;
    playerRow.setAttribute('style', 'color: ' + this.players[pl].bikeColor);
    this.playerList.appendChild(playerRow);
  }
}

Game.prototype.addPlayer = function(player, colorChosen){
  var bike; 
  if(!colorChosen)
    bike = this.getNextBike();
  else{
    bike = this.bikes[colorChosen];
    this.bikes[colorChosen].taken = true;
  }
  var bikeColor = colorChosen || bike.color;
  // Create the corresponding DOM element
  var playerRow = document.createElement('p');
  playerRow.innerHTML = player.id;
  playerRow.setAttribute('style', 'color: ' + bikeColor);
  this.playerList.appendChild(playerRow);

  this.players[player.id] = new Player({
    id: player.id,
    x: player.x,
    y: player.y,
    ghost: player.ghost,
    bikeColor: bikeColor,
    direction: player.direction
  });

  return this.players[player.id];
}


Game.prototype.getNextBike = function(){
    for(bike in this.bikes){
      if(!this.bikes[bike].taken){
        this.bikes[bike].taken = true;
        return {
          color: bike,
          imagePrefix: this.bikes[bike].imagePrefix,
        };
      }
    }
}

Game.prototype.drawWall = function(wall, color){
  if(wall.length == 0)
    return
  var currentPoint = wall.shift();
  this.ctx.beginPath();
  this.ctx.moveTo(
      this.canvas.width / 100 * currentPoint.x, 
      this.canvas.height / 100 * currentPoint.y
      );
  while(wall.length > 0){
    currentPoint = wall.shift();
    this.ctx.lineTo(
        this.canvas.width / 100 * currentPoint.x, 
        this.canvas.height / 100 * currentPoint.y
        );
    this.ctx.strokeStyle=color;
    this.ctx.stroke();
  }
  this.ctx.closePath();
}

Game.prototype.won = function(playerID){
  // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  // this.ctx.fillStyle = "red";
  // this.ctx.font = "bold " + Math.floor(this.canvas.width / 50) + "pt Arial";
  if(playerID == player.id){
	  buildMessageDisplay("Vous avez gagné !");	  
    // this.ctx.fillText("Vous avez gagné !", 
      // canvas.width / 5, 
      // canvas.height / 10);
  } else {
	  buildMessageDisplay(playerID + " a gagné !");
    // this.ctx.fillText(playerID + " a gagné !",
      // canvas.width / 5, 
      // canvas.height / 10);
  }
}

Game.prototype.draw = function(playerID){
	buildMessageDisplay("Pas loin. Vous les aurez la prochaine fois !");
  /*this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold " + Math.floor(this.canvas.width / 50) + "pt Arial";
  this.ctx.fillText("Pas loin. Vous les aurez la prochaine fois !", 
      canvas.width / 5, 
      canvas.height / 10);*/
}
