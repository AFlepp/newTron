exports.Player = function(options){
  this.id = options.id
  this.alive = true
  this.connected = true
  this.setGhost()
  this.game = options.game
  this.conn = options.conn
  this.broadcast = options.broadcast
  this.direction = options.direction
  this.x = options.x
  this.y = options.y
  this.boxCol = {}
  this.wall = options.wall
  this.speed = options.speed
  this.limits = {}
  this.previousPlaces = [];
}

exports.Player.prototype.setGhost = function(){
  this.ghost = true
  setTimeout(function(){
    this.ghost = false
    this.wall = [this.direction, [this.x, this.y], [this.x, this.y]]
    this.broadcast(this.game,
      {
        code: "ghostEnd",
        playerID: this.id
      })
  }.bind(this), 3000)
}

exports.Player.prototype.changeDirection = function(newDirection){
  this.wall[this.wall.length] = [this.x, this.y]
  this.direction = newDirection
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
      this.limits.right
      );
  
  if(reachBorder && !this.ghost)
    this.addWall();
  
  switch(this.direction){
    case "up":
      if(this.limits.top)
        this.y = 100
        this.y -= this.speed
      break;
    case "down":
      if(this.limits.bottom)
        this.y = 0
        this.y += this.speed
      break;
    case "left":
      if(this.limits.left)
    	this.x = 100
        this.x -= this.speed / 16 * 9
      break; 
    case "right":
      if(this.limits.right)
        this.x = 0
        this.x += this.speed / 16 * 9
      break;
  }
  
  
}

exports.Player.prototype.addWall = function(){
	    this.wall[this.wall.length] = [this.x, this.y]
	    this.wall[this.wall.length] = [0, 0]
	    
	    switch(this.direction){
	    case "up":
	    	this.wall[this.wall.length] = [this.x, 100]
	    break;
	    case "down":
	    	this.wall[this.wall.length] = [this.x, 0]
	    break;
	    case "left":
	    	this.wall[this.wall.length] = [100, this.y]
	    break;
	    case "right":
	    	this.wall[this.wall.length] = [0, this.y]
	    break;
	    }
}

exports.Player.prototype.laMuerta = function(){
  this.alive = false
  this.broadcast(
      this.game,
      {
        code: "Collision",
        playerID: this.id
      }
      )
}

exports.Player.prototype.collision = function (plCol){
	switch(plCol.direction){
		case "up":
		case "down":
			this.boxCol = {
				x1 : this.x-(4/6),
				x2 : this.x+(4/6),
				y1 : this.y-2,
				y2 : this.y+2
			}
		break;
		case "left":
		case "right":
			this.boxCol = {
				x1 : this.x-2,
				x2 : this.x+2,
				y1 : this.y-(4/6),
				y2 : this.y+(4/6)
			}
		break;
	}	
	
	
	if (this != plCol){
		
		if ((plCol.x >= this.boxCol.x1 && plCol.x <= this.boxCol.x2)			
			&& (plCol.y >= this.boxCol.y1 && plCol.y <= this.boxCol.y2)){
					this.col += 1
					this.alive = false
					plCol.alive = false
					console.log("collision entre 2 motos")
					this.laMuerta()
					plCol.laMuerta()
					console.log(this.wall)
		}
		
	}
	console.log(this.wall)
	for (i = 1; i < plCol.wall.length-1; i++) {
				if (this.x >= plCol.wall[i][0] && this.x <= plCol.wall[i+1][0]
						&& this.y == (plCol.wall[i][1] && plCol.wall[i+1][1])) {
							this.alive = false
							console.log("vertical collision")
							this.laMuerta()
	
				} else if (this.x <= plCol.wall[i][0]&& this.x >= plCol.wall[i+1][0]
						&& this.y == (plCol.wall[i][1] && plCol.wall[i+1][1])) {
							this.alive = false
							console.log("vertical collision")
							this.laMuerta()
	
				}
	
				if (this.y >= plCol.wall[i][1] && this.y <= plCol.wall[i+1][1]
						&& this.x == (plCol.wall[i][0] && plCol.wall[i+1][0])) {
							this.alive = false
							console.log("horizontal collision")
							this.laMuerta()
				} else if (this.y >= plCol.wall[i+1][1]
						&& this.y <= plCol.wall[i][1]
						&& this.x == (plCol.wall[i][0] && plCol.wall[i+1][0])) {
							this.alive = false
							console.log("horizontal collision")
							this.laMuerta()
				}
	}

}
