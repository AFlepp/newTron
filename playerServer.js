exports.Player = function(options){
  this.id = options.id
  this.conn = options.conn
  this.direction = options.direction
  this.x = options.x
  this.y = options.y
  this.wall = options.wall
  this.speed = options.speed
  this.limits = {}
}

exports.Player.prototype.move = function(){
  this.limits.top = this.y < 0;
  this.limits.bottom = this.y > 100; 
  this.limits.left = this.x < 0;
  this.limits.right = this.x > 100; 
  // Set to true if has reached any border
  var reachBorder = ( 
      this.limits.top || 
      this.limits.bottom || 
      this.limits.left || 
      this.limits.right);
  
  switch(this.direction){
    case "up":
      if(this.limits.top)
        this.y = 100;
      this.y -= this.speed + 0.008
      break;
    case "down":
      if(this.limits.bottom)
        this.y = 0;
      this.y += this.speed + 0.008
      break;
    case "left":
      if(this.limits.left)
        this.x = 100;
      this.x -= this.speed / 16 * 9 + 0.008
      break; 
    case "right":
      if(this.limits.right)
        this.x = 0;
      this.x += this.speed / 16 * 9 + 0.008
      break;
  }
  // If it hasn't reached any border, just draw a line
  if(!reachBorder)
    this.addWall();

}

exports.Player.prototype.addWall = function(){
	if (this.direction != this.wall[0]){
		this.wall[this.wall.length] = [this.x, this.y]
		this.wall[0] = this.direction
	}
}


exports.Player.prototype.collision = function (plCol){
