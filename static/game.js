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

Game.prototype.reset = function(){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  var pl;
  for(pl in this.players){
    this.players[pl].ghost = true;
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
  // Create the corresponding DOM element
  var playerRow = document.createElement('p');
  playerRow.innerHTML = player.id;
  playerRow.setAttribute('style', 'color: ' + colorChosen||bike.color);
  this.playerList.appendChild(playerRow);

  this.players[player.id] = new Player({
    id: player.id,
    x: player.x,
    y: player.y,
    ghost: player.ghost,
    bikeColor: colorChosen || bike.color,
    direction: player.direction,
    DOMparagraph: playerRow
  });

  return this.players[player.id];
}

Game.prototype.removePlayer = function(playerID){
  this.playerList.removeChild(this.players[playerID].DOMparagraph);
  delete this.players[playerID]
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
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold " + Math.floor(this.canvas.width / 50) + "pt Arial";
  if(playerID == player.id){
    this.ctx.fillText("Vous avez gagné !", 
      canvas.width / 5, 
      canvas.height / 10);
  } else {
    this.ctx.fillText(playerID + " a gagné !",
      canvas.width / 5, 
      canvas.height / 10);
  }
}

Game.prototype.draw = function(playerID){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold " + Math.floor(this.canvas.width / 50) + "pt Arial";
  this.ctx.fillText("Pas loin. Vous les aurez la prochaine fois !", 
      canvas.width / 5, 
      canvas.height / 10);
}
