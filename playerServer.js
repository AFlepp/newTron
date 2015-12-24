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
  this.avantMoto = []
  this.wall = options.wall
  this.speed = options.speed
  this.limits = {}
}

exports.Player.prototype.setGhost = function(){
  this.ghost = true
  setTimeout(function(){
    this.ghost = false
    this.wall = [[this.direction], [this.x, this.y], [this.x, this.y]]
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
  
//  if(!reachBorder && !this.ghost)
//    this.addWall();

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

//exports.Player.prototype.addWall = function(){
//	if (this.direction != this.wall[0]){
//	  this.wall[this.wall.length] = [this.x, this.y]
//	  this.wall[0] = this.direction
//        } else {
//          this.wall[this.wall.length - 1] = [this.x, this.y]
//        }
//}

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
	  switch(this.direction){
	    case "up":
	    	this.avantMoto[0] = [this.x-(4/6),this.y-2]
	    	this.avantMoto[1] = [this.x+(4/6),this.y-2]
	      break;
	    case "down":
	    	this.avantMoto[0] = [this.x-(4/6),this.y+2]
	    	this.avantMoto[1] = [this.x+(4/6),this.y+2]
	      break;
	    case "left":
	    	this.avantMoto[0] = [this.x-2,this.y-(4/6)]
	    	this.avantMoto[1] = [this.x-2,this.y+(4/6)]
	      break; 
	    case "right":
	    	this.avantMoto[0] = [this.x+2,this.y-(4/6)]
	    	this.avantMoto[1] = [this.x+2,this.y+(4/6)]
	      break;
	  }

	  if ((((this.avantMoto[0][0]||this.avantMoto[1][0]) >= plCol.x-2) &&
               ((this.avantMoto[0][0]||this.avantMoto[1][0])<= plCol.x+2)) && 
              ((this.avantMoto[0][1]||this.avantMoto[1][1]) >= plCol.y-(4/6)) && 
              ((this.avantMoto[0][1]||this.avantMoto[0][1]) <= plCol.y+(4/6))){
			  	this.col += 1
                                this.alive = false
                                plCol.alive = false
			  	console.log("horizontal collision entre 2 motos" + " " + this.col + " " + this.wall)
                                this.laMuerta()
                                plCol.laMuerta()
	  } else if ((((this.avantMoto[0][0]||this.avantMoto[1][0])>= plCol.x-(4/6))&&((this.avantMoto[0][0]||this.avantMoto[1][0])<= plCol.x+(4/6)))
			  && ((this.avantMoto[0][1]||this.avantMoto[1][1])>= plCol.y-2)&&((this.avantMoto[0][1]||this.avantMoto[0][1])<= plCol.y+2)){
			  	this.col += 1
                                this.alive = false
                                plCol.alive = false
			  	console.log("vertical collision entre 2 motos" + " " + this.col + " " + this.wall)
                                this.laMuerta()
                                plCol.laMuerta()
          }	  

	for (i = 1; i < this.wall.length; i++) {
		for (j = i+1; j < this.wall.length; j++) {

			//vertical collision with is own wall
			if (this.x >= this.wall[i][0] && this.x <= this.wall[i + 1][0]
					&& this.y == (this.wall[i][1] && this.wall[i + 1][1])) {
				this.alive = false
				console.log("vertical collision")
				this.laMuerta()

			} else if (this.x >= this.wall[i + 1][0]
					&& this.x <= this.wall[i][0]
					&& this.y == (this.wall[i][1] && this.wall[i + 1][1])) {
				this.alive = false
				console.log("vertical collision")
				this.laMuerta()

			}

			if (this.y >= this.wall[i][1] && this.y <= this.wall[i + 1][1]
					&& this.x == (this.wall[i][0] && this.wall[i + 1][0])) {
				this.alive = false
				console.log("horizontal collision")
				this.laMuerta()
			} else if (this.y >= this.wall[i + 1][1]
					&& this.y <= this.wall[i][1]
					&& this.x == (this.wall[i][0] && this.wall[i + 1][0])) {
				this.alive = false
				console.log("horizontal collision")
				this.laMuerta()
			}
		}
	}
}
