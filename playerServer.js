exports.Player = function(options){
  this.id = options.id
  this.conn = options.conn
  this.direction = options.direction
  this.x = options.x
  this.y = options.y
  this.col = options.col
  this.avantMoto = options.avantMoto
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
  
  if(!reachBorder)
	    this.addWall();
  
  switch(this.direction){
    case "up":
      if(this.limits.top)
        this.y = 100;
      this.y -= this.speed
      break;
    case "down":
      if(this.limits.bottom)
        this.y = 0;
      this.y += this.speed
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


}

exports.Player.prototype.addWall = function(){
	if (this.direction != this.wall[0]){
		this.wall[this.wall.length] = [this.x, this.y]
		this.wall[0] = this.direction
	}
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

	  if ((((this.avantMoto[0][0]||this.avantMoto[1][0])>= plCol.x-2)&&((this.avantMoto[0][0]||this.avantMoto[1][0])<= plCol.x+2))
			  && ((this.avantMoto[0][1]||this.avantMoto[1][1])>= plCol.y-(4/6))&&((this.avantMoto[0][1]||this.avantMoto[0][1])<= plCol.y+(4/6))){
			  	this.col += 1
			  	console.log("horizontal collision entre 2 motos" + " " + this.col + " " + this.wall)
	  } else if ((((this.avantMoto[0][0]||this.avantMoto[1][0])>= plCol.x-(4/6))&&((this.avantMoto[0][0]||this.avantMoto[1][0])<= plCol.x+(4/6)))
			  && ((this.avantMoto[0][1]||this.avantMoto[1][1])>= plCol.y-2)&&((this.avantMoto[0][1]||this.avantMoto[0][1])<= plCol.y+2)){
			  	this.col += 1
			  	console.log("vertical collision entre 2 motos" + " " + this.col + " " + this.wall)
	  }
	  
//	for (i = 1 ; i<this.wall.length ; i++){
//		for (j = i+1 ; j<=this.wall.length ; j++){
//			  if (((this.avantMoto[0][0]) <= (this.wall[1][0])) && ((this.avantMoto[1][0]) <= (this.wall[1][0]))
//					  && ((this.avantMoto[0][1]) >= (this.wall[1][1])) && ((this.avantMoto[0][1]) <= (this.wall[1][1]))){
//				  		this.col += 1
//				  		console.log("avec le point central" + " " + this.col + " " + this.wall)
//			  }
//		//vertical collision between a bike and his own wall
//			if (((this.x >=(this.wall[[i][0]])&&(this.x+4 <=(this.wall[[j][0]]))
//					&& ((this.y||this.y+2)==((this.wall[[i][0]])&&(this.wall[[j][0]])))))){
//				console.log("collision vertical collision with his own wall")
//		    			broadcastToPlayers(this.game, {
//		    			code: "Collision",
//		    			playerID1: this.ID,
//		    			wallID1: this.wall,
//		    			playerID2: plCol.ID,
//		    			wallID2: plCol.ID
//		    			})
//		    //horizontal collision between a bike and his own wall
//			} else if (((this.y >=(this.wall[[i][1]])&&(this.y+4<=(this.wall[[j][1]]))
//					&& ((this.x||this.x+4)==((this.wall[[i][0]])&&(this.wall[[j][0]])))))){
//				console.log("collision horizontal with own wall")
//		    			broadcastToPlayers(this.game, {
//		    			code: "Collision",
//		    			playerID1: this.ID,
//		    			wallID1: this.wall,
//		    			playerID2: plCol.ID,
//		    			wallID2: plCol.ID
//		    			})
//    		//vertical collision between a bike and plCol.wall
			} 
//				else if (((this.x >=(plCol.wall[[i][0]])&&(this.x+4<=(plCol.wall[[j][0]]))
//					&& ((this.y||this.y+4)==((this.wall[[i][1]])&&(this.wall[[j][1]])))))){
//				console.log("collision vertical collision with other wall bike ")
//		    			broadcastToPlayers(this.game, {
//		    			code: "Collision",
//		    			playerID1: this.ID,
//		    			wallID1: this.wall,
//		    			playerID2: plCol.ID,
//		    			wallID2: plCol.ID
//		    			})
//		    //horizontal collision between a bike and plCol.wall
//			} else if (((this.y >=(plCol.wall[[i][1]])&&(this.y+4<=(plCol.wall[[j][1]]))
//					&& ((this.x||this.x+4)==((plCol.wall[[i][0]])&&(plCol.wall[[j][0]])))))){
//				console.log("collision horizontal collision with other wall bike")
//		    			broadcastToPlayers(this.game, {
//		    			code: "Collision",
//		    			playerID1: this.ID,
//		    			wallID1: this.wall,
//		    			playerID2: plCol.ID,
//		    			wallID2: plCol.ID
//		    			})
//		    //vertical collision between a bike and plCol.wall in drawing
//			} else if (((this.x >=plCol.x)&&(this.x+4<=(plCol.wall[[plCol.wall.length][0]]))
//					&& ((this.y||this.y+4)==(plCol.y && plCol.wall[[plCol.wall.length][1]])))){
//				console.log("collision vertical collision avec le mur qui se dessine")
//						broadcastToPlayers(this.game, {
//						code: "Collision",
//						playerID1: this.ID,
//						wallID1: this.wall,
//						playerID2: plCol.ID,
//						wallID2: plCol.ID
//						})
//			 //horizontal collision between a bike and plCol.wall in drawing
//			} else if (((this.y >=plCol.y)&&(this.y+4<=(plCol.wall[[plCol.wall.length][1]]))
//					&& ((this.x||this.x+4)==(plCol.x && plCol.wall[[plCol.wall.length][0]])))){
//				console.log("collision horizontal collision avec le mur qui se dessine")
//    					broadcastToPlayers(this.game, {
//    					code: "Collision",
//    					playerID1: this.ID,
//    					wallID1: this.wall,
//    					playerID2: plCol.ID,
//    					wallID2: plCol.ID
//    					})
//			}
		}
	}
}
