exports.Player = function(options){
  this.id = options.id
  this.conn = options.conn
  this.direction = options.direction
  this.x = options.x
  this.y = options.y
  this.wall = options.wall
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

exports.Player.prototype.limitCanvas = function (){
	 if (this.x == 100){
		 this.x = 0
	 }
	 if (this.y == 100){
		 this.y = 0
	 }
	 if (this.x == 0){
		 this.x = 100
	 }
	 if (this.y == 0){
		 this.y = 100
	 }
}

exports.Player.prototype.wall = function (){
	if (this.direction != this.wall[0]){
		this.wall[this.wall.length] = [this.x, this.y]
		this.wall[0] = this.direction
	}
}


exports.Player.prototype.collision = function (plCol){
	// moto = 4 coins{[(x,y)], [(x+4,y)], [(x,y+4)], [(x+4, y+4)]}
		
	// collision between 2 bikes
	/*if (((this.x||this.x+4)>= plCol.x)&&((this.x||this.x+4)<= plCol.x+4)){
        	broadcastToPlayers(this.game, {
        	code: "Collision",
        	playerID1: this.ID,
        	wallID1: this.wall,
        	playerID2: plCol.ID,
        	wallID2: plCol.ID
        	})
	} else if (((this.y||this.y+4)>= plCol.y)&&((this.y||this.y+4)<= plCol.y+4)){
    	broadcastToPlayers(this.game, {
        	code: "Collision",
        	playerID1: this.ID,
        	wallID1: this.wall,
        	playerID2: plCol.ID,
        	wallID2: plCol.ID
        	})
	}
	
	
	// vertical collision between a bike and his start point
	if (((this.x <= this.wall[[1][0]])&&(this.x+4 >= this.wall[[1][0]]))
			&& ((this.y||this.y+4) == this.wall[[1][1]]))){
    			broadcastToPlayers(this.game, {
    			code: "Collision",
    			playerID1: this.ID,
    			wallID1: this.wall,
    			playerID2: plCol.ID,
    			wallID2: plCol.ID
    			})
    // horizontal collision between a bike and his start point
	} else if (((this.y <=(this.wall[[1][1]])&&(this.y+4 >=(this.wall[[1][1]]))
			&& ((this.x||this.x+4)==(this.wall[[1][0]]))){
    			broadcastToPlayers(this.game, {
    			code: "Collision",
    			playerID1: this.ID,
    			wallID1: this.wall,
    			playerID2: plCol.ID,
    			wallID2: plCol.ID
    			})
    	
	}
		
	for (i = 1 ; i<this.wall.length ; i++){
		for (j = i+1 ; j<this.wall.length ; j++){
			//vertical collision between a bike and his own wall
			if (((this.x >=(this.wall[[i][0]])&&(this.x+4<=(this.wall[[j][0]]))
					&& ((this.y||this.y+4)==((this.wall[[i][0]])&&(this.wall[[j][0]])))){
    			broadcastToPlayers(this.game, {
    			code: "Collision",
    			playerID1: this.ID,
    			wallID1: this.wall,
    			playerID2: plCol.ID,
    			wallID2: plCol.ID
    			})
		    //horizontal collision between a bike and his own wall
			} else if (((this.y >=(this.wall[[i][1]])&&(this.y+4<=(this.wall[[j][1]]))
					&& ((this.x||this.x+4)==((this.wall[[i][0]])&&(this.wall[[j][0]])))){
    			broadcastToPlayers(this.game, {
    			code: "Collision",
    			playerID1: this.ID,
    			wallID1: this.wall,
    			playerID2: plCol.ID,
    			wallID2: plCol.ID
    			})
    		//vertical collision between a bike and plCol.wall
			} else if (((this.x >=(plCol.wall[[i][0]])&&(this.x+4<=(plCol.wall[[j][0]]))
					&& ((this.y||this.y+4)==((this.wall[[i][1]])&&(this.wall[[j][1]])))){
		    			broadcastToPlayers(this.game, {
		    			code: "Collision",
		    			playerID1: this.ID,
		    			wallID1: this.wall,
		    			playerID2: plCol.ID,
		    			wallID2: plCol.ID
		    			})
		    //horizontal collision between a bike and plCol.wall
			} else if (((this.y >=(plCol.wall[[i][1]])&&(this.y+4<=(plCol.wall[[j][1]]))
					&& ((this.x||this.x+4)==((plCol.wall[[i][0]])&&(plCol.wall[[j][0]])))){
		    			broadcastToPlayers(this.game, {
		    			code: "Collision",
		    			playerID1: this.ID,
		    			wallID1: this.wall,
		    			playerID2: plCol.ID,
		    			wallID2: plCol.ID
		    			})
		    //vertical collision between a bike and plCol.wall in drawing
			} else if (((this.x >=plCol.x)&&(this.x+4<=(plCol.wall[[plCol.wall.length][0]]))
					&& ((this.y||this.y+4)==(plCol.y && plCol.wall[[plCol.wall.length][1]]))){
						broadcastToPlayers(this.game, {
						code: "Collision",
						playerID1: this.ID,
						wallID1: this.wall,
						playerID2: plCol.ID,
						wallID2: plCol.ID
				})
			 //horizontal collision between a bike and plCol.wall in drawing
			} else if (((this.y >=plCol.y)&&(this.y+4<=(plCol.wall[[plCol.wall.length][1]]))
					&& ((this.x||this.x+4)==(plCol.x && plCol.wall[[plCol.wall.length][0]]))){
    					broadcastToPlayers(this.game, {
    					code: "Collision",
    					playerID1: this.ID,
    					wallID1: this.wall,
    					playerID2: plCol.ID,
    					wallID2: plCol.ID
    					})
			}
		}
	}*/
}
