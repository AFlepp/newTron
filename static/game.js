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
    pruple: {
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
  window.requestAnimationFrame(this.mainLoop.bind(this), 1000/30);
  for(pl in this.players){
    this.players[pl].sprite.clear();
  }
  for(pl in this.players){
    this.players[pl].sprite.update();
    this.players[pl].sprite.draw();
  }
}

Game.prototype.addPlayer = function(player){
  var bike = this.getNextBike();
  this.players[player.id] = new Player({
    id: player.id,
    bikeColor: bike.color,
    sprite: new Sprite({
        image: "/sprites/images/" + 
        bike.pref +
        "up.png",
        direction: player.direction,
        x: player.x,
        y: player.y,
        speed: player.speed,
        ticksPerFrame: 1,
        numberOfFrames: 1
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
          pref: this.bikes[bike].imagePrefix,
        };
      }
    }
}

Game.prototype.reset = function(){
  for(pl in this.players){
    this.players[pl].sprite.resetCoordinates();
  }
}
