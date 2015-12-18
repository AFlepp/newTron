exports.Game = function(options) {
	this.id = options.id
	this.players = {}
	this.playersMax = options.playersMax
        this.mainLoop
        this.broadcast = options.broadcast
}

exports.Game.prototype.reset = function(){
  var p;
  for(p in this.players){
    this.players[p].x = 50
    this.players[p].y = 50
  }
}

exports.Game.prototype.sendGameState = function(){
  var players = {}, p
  for(p in this.players){
    players[p] = {
      x: this.players[p].x,
      y: this.players[p].y,
      direction: this.players[p].direction
    }
  }
  this.broadcast(
      this,
      {
        code: "newGameState",
        players: players
      }
      )
}

exports.Game.prototype.calculateNextFrame = function() {
  var i, j, keys;
  keys = Object.keys(this.players);
  for (i = 0; i < keys.length; i++) {
    this.players[keys[i]].move()
    for (j = i+1; j < keys.length; j++){
      this.players[keys[i]].collision(this.players[keys[j]])
    }
  }
  this.sendGameState()
}

exports.Game.prototype.start = function(ws) {
  this.mainLoop = setInterval(this.calculateNextFrame.bind(this), 1000/60)
}

exports.Game.prototype.getFormattedAllPlayers = function() {
	var pl = {}
	for (p in this.players) {
		pl[p] = this.getFormattedPlayer(p)
	}
	return pl
}

exports.Game.prototype.getFormattedPlayer = function(playerID) {
	return {
		id : playerID,
		x : this.players[playerID].x,
		y : this.players[playerID].y,
		direction : this.players[playerID].direction,
		speed : this.players[playerID].speed
	}
}
