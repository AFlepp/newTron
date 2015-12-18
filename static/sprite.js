// Building a sprite
function Sprite(options){
  var spr = this;
  var img = new Image();
  img.src = options.image;

  this.canvas = canvas;
  this.ctx = ctx;
  this.image = img;
  this.frameIndex = 0;
  this.tickCount = 0;
  this.ticksPerFrame = options.ticksPerFrame || this.ticksPerFrame || 0;
  this.numberOfFrames = options.numberOfFrames || 1;
  // percentage_ is the value from the canvas border in percent
  this.percentage_x = options.x;
  this.percentage_y = options.y;
  this.direction = options.direction;
  this.color = options.color;
  this.speed_y = options.speed;
  this.speed_x = options.speed * 9 / 16;
  this.isAlive = true;

  // need the onload, otherwrcentage_x = options.x;
  this.percentage_y = options.y;
  this.size = this.canvas.height / 25;
  this.direction = options.direction;
  this.color = options.color;
  this.limits = {}
  this.previousPlaces = []

  // need the onload, otherwise it just crashes...
  // scope change in onload, so we need a closure
  img.onload = function(){
    switch (spr.direction){
      case "up":
      case "down":
        spr.imageWidth = this.width / 3;
        spr.imageHeight = this.height;
        spr.spriteWidth = spr.size / 3;
        spr.spriteHeight = spr.size;
        break;
      case "left":
      case "right":
        spr.imageWidth = this.width;
        spr.imageHeight = this.height / 3;
        spr.spriteWidth = spr.size;
        spr.spriteHeight = spr.size / 3;
        break;
    }
    spr.calculateRealCoordinates();
  }
};

Sprite.prototype.clear = function(x, y){
    this.ctx.clearRect(x || this.x, y || this.y, this.spriteWidth / this.numberOfFrames, this.spriteHeight);
};

Sprite.prototype.draw = function(){
  // Don't even try to draw something if the image isn't loaded.
  if(this.imageWidth){
    switch(this.direction){
      case "up":
      case "down":
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.imageWidth / this.numberOfFrames + this.imageWidth,
            0,
            this.imageWidth / this.numberOfFrames,
            this.imageHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
            );
        break;
      case "left":
      case "right":
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.imageWidth / this.numberOfFrames,
            this.imageHeight,
            this.imageWidth / this.numberOfFrames,
            this.imageHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
            );
        break;
    }
  }
};

// Enable us to animate our sprites
Sprite.prototype.update = function(){
  this.tickCount ++;
  if(this.tickCount === this.ticksPerFrame){
    this.tickCount = 0;
    // Don't try to update the movement if the image isn't loaded
    if(this.frameIndex < this.numberOfFrames - 1){
      this.frameIndex ++;
    } else {
      this.frameIndex = 0;
    }
    if(this.imageWidth){
      this.move();
    }
  }
}

Sprite.prototype.move = function(){
  // Declare borders
  this.limits.top = this.percentage_y < 0;
  this.limits.bottom = this.percentage_y > 100; 
  this.limits.left = this.percentage_x < 0;
  this.limits.right = this.percentage_x > 100; 
  // Set to true if has reached any border
  var reachBorder = ( 
      this.limits.top || 
      this.limits.bottom || 
      this.limits.left || 
      this.limits.right);
  
  if(reachBorder){
    this.drawAllLines();
  } 
  // Set previous places
  switch(this.direction){
    case "up":
      if(this.limits.top)
        this.percentage_y = 100;
      this.percentage_y -= this.speed_y;
      break;
    case "down":
      if(this.limits.bottom)
        this.percentage_y = 0;
      this.percentage_y += this.speed_y;
      break;
    case "left":
      if(this.limits.left)
        this.percentage_x = 100;
      this.percentage_x -= this.speed_x;
      break; 
    case "right":
      if(this.limits.right)
        this.percentage_x = 0;
      this.percentage_x += this.speed_x;
      break;
  }
  var coor = this.calculateRealCoordinates();
  // If it hasn't reached any border, just draw a line
  this.previousPlaces.push(coor);
  if(this.previousPlaces.length > 5){
    this.drawLine();  
  }
}

// Set x and y at the real coordinates to draw the image
// But return the x and y relative to the real percentage points
Sprite.prototype.calculateRealCoordinates = function(){
  var midx = canvas.offsetWidth / 100 * this.percentage_x;
  var midy = canvas.offsetHeight / 100 * this.percentage_y;
  this.x =  midx - this.spriteWidth / 2
  this.y = midy - this.spriteHeight / 2
  return {x: midx, y: midy}
}

Sprite.prototype.resetCoordinates = function(){
  this.percentage_x = 50, this.percentage_y = 50;
}

Sprite.prototype.drawAllLines = function(){
  while(this.previousPlaces.length > 0){
    this.drawLine();
  }
}

Sprite.prototype.drawLine = function(){
  var bx, by;
  var start = this.previousPlaces.shift();
  if(this.previousPlaces.length > 0){
    bx = start.x;
    by = start.y;
    this.ctx.beginPath();
    this.ctx.moveTo(bx, by);
    this.ctx.lineTo(this.previousPlaces[0].x, this.previousPlaces[0].y)
    this.ctx.strokeStyle=this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

Sprite.prototype.laMuerta = function(){
  this.clear();
  var sprite=this;
  var thisBikeX = sprite.x;  var thisBikeW = sprite.spriteWidth;
  var thisBikeY = sprite.y;  var thisBikeH = sprite.spriteHeight;
  this.isAlive = false;
  console.log(sprite.spriteWidth);
  this.image.src="sprites/images/KABOUM!.png";
  
  this.image.onload= function(){
    console.log(sprite.spriteWidth);
    this.ctx.drawImage(this.image, sprite.x, sprite.y-thisBikeH/2);
        setTimeout(function(){
          sprite.clear();
        }.bind(this), 1250);
        
  }.bind(this);
  
}
