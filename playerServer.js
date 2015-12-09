exports.Player = function(options){
  this.id = options.id
  this.conn = options.conn
  this.direction = options.direction
  this.x = options.x
  this.y = options.y
  this.speed = options.speed
}

exports.Player.prototype.move = function(){
  switch(this.direction){
    case "left":
      this.x -= this.speed
      break
    case "right":
      this.x += this.speed
      break
    case "up":
      this.y -= this.speed
      break
    case "down":
      this.y += this.speed
      break
  }
}
