function Game(can, ctx){
  this.id;
  this.canvas = can;
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
  this.players[player.id] = new Player({
    id: player.id,
    x: player.x,
    y: player.y,
    ghost: player.ghost,
    bikeColor: colorChosen || bike.color,
    direction: player.direction
  })
  return this.players[player.id]
}

Game.prototype.removePlayer = function(playerID){
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
  wall.shift(); // get rid of direction
  var currentPoint = wall.shift();
  this.ctx.beginPath();
  this.ctx.moveTo(
      this.canvas.width / 100 * currentPoint[0], 
      this.canvas.height / 100 * currentPoint[1]
      );
  while(wall.length > 0){
    currentPoint = wall.shift();
    this.ctx.lineTo(
        this.canvas.width / 100 * currentPoint[0], 
        this.canvas.height / 100 * currentPoint[1]
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
    this.ctx.fillText("YOU WON !", 
      canvas.width / 5, 
      canvas.height / 10);
  } else {
    this.ctx.fillText(playerID + " WON !",
      canvas.width / 5, 
      canvas.height / 10);
  }
}

Game.prototype.draw = function(playerID){
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "red";
  this.ctx.font = "bold " + Math.floor(this.canvas.width / 50) + "pt Arial";
  this.ctx.fillText("IT'S A DRAW. YOU'LL GET 'EM NEXT TIME !", 
      canvas.width / 5, 
      canvas.height / 10);
}
