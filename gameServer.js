exports.Game = function(options) {
	this.id = options.id
	this.players = {}
	this.playersMax = options.playersMax
        this.newTime
        this.lastTick
}

exports.Game.prototype.mainLoop = function() {
  var i, keys;
  keys = Object.keys(this.players);
  for (i = 0; i < keys.length; i++) {
    this.players[keys[i]].move()
    for (j = i+1; j < keys.length; j++){
      this.players[keys[i]].collision(this.players[keys[j]])
    }
  }
  this.newTime = new Date().getTime()
  var ms = 1000/30 - (this.newTime - this.lastTick)
  setTimeout(this.mainLoop.bind(this), ms);
  this.lastTick = this.newTime
}

exports.Game.prototype.start = function() {
  this.lastTick = new Date().getTime()
  this.mainLoop()
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
