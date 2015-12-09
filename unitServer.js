exports.Unit = function(options){
  this.id = options.id
  var coordinates = this.calculateStartingPoint(options.playerID)
  this.x = coordinates[0]
  this.y = coordinates[1]
  this.sight = 10
  this.speed = 0.2
  this.damages = 1
}

exports.Unit.prototype.calculateStartingPoint = function(playerID){
  console.log(playerID)
  switch(playerID){
    case 1:
      return [10, 50]
    case 2:
        return [90, 50]
  }
}
