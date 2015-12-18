function Game(){
  this.id;
  this.players = {};
  this.bikes = {
    green: {
      imagePrefix: "j5_",
      taken: false
    },
    red: {
      imagePrefix: "j4_",
      taken: false
    },
    blue:{
      imagePrefix: "j1_",
      taken: false
    },
    purple: {
      imagePrefix: "j3_",
      taken: false,
    },
    yellow: {
      imagePrefix: "j2_",
      taken: false
    },
    orange: {
      imagePrefix: "j6_",
      taken: false
    }
  }
}

Game.prototype.mainLoop = function(){
  var sprite;
  for(pl in this.players){
    if(this.players[pl].sprite.isAlive){
      sprite = this.players[pl].sprite;
      sprite.clear();
      sprite.update();
      sprite.draw();
    }
  }
  window.requestAnimationFrame(this.mainLoop.bind(this), 1000/30);
}

Game.prototype.addPlayer = function(player, colorChosen){
  var bike, way = "up"; 
  if(!colorChosen)
    bike = this.getNextBike();
  else{
    bike = this.bikes[colorChosen];
    this.bikes[colorChosen].taken = true;
  }
  this.players[player.id] = new Player({
    id: player.id,
    bikeColor: colorChosen || bike.color ,
    sprite: new Sprite({
        image: "/sprites/images/" + 
        bike.imagePrefix +
        way + ".png",
        direction: player.direction,
        x: player.x,
        y: player.y,
        speed: player.speed,
        ticksPerFrame: 1,
        numberOfFrames: 1,
        color: bike.color || colorChosen
      })
  })
  return this.players[player.id]
}

Game.prototype.start = function(){
  this.mainLoop();
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

Game.prototype.reset = function(){
  for(pl in this.players){
    this.players[pl].sprite.resetCoordinates();
  }
}
