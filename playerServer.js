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
  boxCol = {}
  this.wall = []
  this.speed = options.speed
  this.limits = {}
  this.previousPlaces = []
}

exports.Player.prototype.setGhost = function(){
  this.ghost = true
  setTimeout(function(){
    this.ghost = false
    this.previousPlaces.push({dir: this.direction, x: this.x, y: this.y})
    this.broadcast(this.game,
      {
        code: "ghostEnd",
        playerID: this.id
      })
  }.bind(this), 3000)
}

exports.Player.prototype.changeDirection = function(newDirection){
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
  
  if(reachBorder){
    this.previousPlaces.push({dir: "break"})
    this.addAllWalls()
  }
  
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

  if(!this.ghost)
    this.previousPlaces.push({dir: this.direction, x: this.x, y: this.y})
  if(this.previousPlaces.length > 5)
    this.addWall();
}

exports.Player.prototype.addWall = function(){
  var place = this.previousPlaces.shift()
  // If it's the first point ,we need two of them. The starting one and the other.
  if(this.wall.length == 0 || this.wall[this.wall.length-1].dir == "break"){
    this.wall.push(place)
    this.wall.push(place) 
  }
  else if(place.dir != this.wall[this.wall.length-1].dir){
    this.wall.push(place)
  }
  else {
    this.wall[this.wall.length-1] = place
  }
}

exports.Player.prototype.addAllWalls = function(){
  while(this.previousPlaces.length > 0){
    this.addWall();
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
  var boxCol;
  switch(plCol.direction){
    case "up":
    case "down":
      boxCol = {
        x1 : this.x-(4/6),
        x2 : this.x+(4/6),
        y1 : this.y-2,
        y2 : this.y+2
      }
    break;
    case "left":
    case "right":
      boxCol = {
        x1 : this.x-2,
        x2 : this.x+2,
        y1 : this.y-(4/6),
        y2 : this.y+(4/6)
      }
    break;
  }	
  
  if (this != plCol){
    if ((plCol.x >= boxCol.x1 && plCol.x <= boxCol.x2) && 
        (plCol.y >= boxCol.y1 && plCol.y <= boxCol.y2)){
          this.col += 1
          this.alive = false
          plCol.alive = false
          console.log("collision entre 2 motos")
          this.laMuerta()
          plCol.laMuerta()
          console.log(this.wall)
    }
  }

  for (i = 0; i < plCol.wall.length-1; i++) {
    if(plCol.wall[i].dir == "break" || plCol.wall[i+1].dir == "break")
      continue
    if (this.x >= plCol.wall[i].x && this.x <= plCol.wall[i+1].x && 
        this.y == (plCol.wall[i].y && plCol.wall[i+1].y)) {
          this.alive = false
          this.laMuerta()
    } else if (this.x <= plCol.wall[i].x && this.x >= plCol.wall[i+1].x && 
        this.y == (plCol.wall[i].y && plCol.wall[i+1].y)) {
          this.alive = false
          this.laMuerta()
    }

    if (this.y >= plCol.wall[i].y && this.y <= plCol.wall[i+1].y && 
        this.x >= plCol.wall[i].x-1 && this.x >= plCol.wall[i+1].x-1 &&
        this.x <= plCol.wall[i].x+1 && this.x <= plCol.wall[i+1].x+1) {
          this.alive = false
          this.laMuerta()
    } else if (this.y >= plCol.wall[i+1].y && this.y <= plCol.wall[i].y && 
        this.x >= plCol.wall[i].x-1 && this.x >= plCol.wall[i+1].x-1 &&
        this.x <= plCol.wall[i].x+1 && this.x <= plCol.wall[i+1].x+1) {
          this.alive = false
          this.laMuerta()
    }
  }
}
