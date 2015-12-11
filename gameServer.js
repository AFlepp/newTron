exports.Game = function(options) {
	this.id = options.id
	this.players = {}
	this.playersMax = options.playersMax
}

exports.Game.prototype.mainLoop = function() {
	setInterval(function() {
		var keys = Object.keys(this.players);
		for (i = 0; i < keys.length; i++) {
			this.players[keys[i]].wall()
			this.players[keys[i]].move()
			this.players[keys[i]].limitCanvas()
			for (j = i+1; j < keys.length; j++){
				this.players[key[i]].collision(this.players[key[j]])
			}
		}
	}, 1000 / 30)
}

exports.Game.prototype.start = function() {
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
