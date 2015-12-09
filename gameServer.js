exports.Game = function(options){
  this.id = options.id
  this.players = {}
  this.playersMax = options.playersMax
}

exports.Game.prototype.mainLoop = function(){
  setInterval(function(){
    for(pl in this.players){
      this.players[pl].move()
    }
  }, 1000/30)
}

exports.Game.prototype.start = function(){
  this.mainLoop()
}

exports.Game.prototype.getFormattedAllPlayers = function(){
  var pl = {}
  for(p in this.players){
    pl[p] = this.getFormattedPlayer(p)
  }
  return pl
}

exports.Game.prototype.getFormattedPlayer = function(playerID){
  return {
    id: playerID,
    x: this.players[playerID].x,
    y: this.players[playerID].y,
    direction: this.players[playerID].direction,
    speed: this.players[playerID].speed
  }
}
