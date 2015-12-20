// Building a sprite
function Sprite(options){
  var spr = this;
  this.player = options.player;
  this.image = new Image();
  this.image.src = options.img;
  this.direction = options.direction;

  this.canvas = canvas;
  this.ctx = ctx;

  // need the onload, otherwrcentage_x = options.x;
  this.size = this.canvas.height / 25;
  this.color = options.color;

  // need the onload, otherwise it just crashes...
  // scope change in onload, so we need a closure
  this.image.onload = function(){
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
      default:
        spr.imageWidth = this.width;
        spr.imageHeight = this.height;
        spr.spriteWidth = this.width;
        spr.spriteHeight = this.height;

    }
    spr.calculateRealCoordinates();
  }
};

Sprite.prototype.clear = function(x, y){
    this.ctx.clearRect(x || this.x, y || this.y, this.spriteWidth, this.spriteHeight);
};

Sprite.prototype.draw = function(){
  // Don't even try to draw something if the image isn't loaded.
  if(this.imageWidth){
    switch(this.direction){
      case "up":
      case "down":
        this.ctx.drawImage(
            this.image,
            this.imageWidth,
            0,
            this.imageWidth,
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
            0,
            this.imageHeight,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
            );
        break;
      default:
        this.ctx.drawImage(
            this.image,
            0,
            0,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.spriteWidth,
            this.spriteHeight
            )
    }
  }
};

// Enable us to animate our sprites
Sprite.prototype.update = function(player){
  this.player.previousPlaces.push(this.calculateRealCoordinates());
  if(this.player.previousPlaces.length > 5){
    this.drawLine();  
  }
}

// Set x and y at the real coordinates to draw the image
// But return the x and y relative to the real percentage points
Sprite.prototype.calculateRealCoordinates = function(){
  var midx = canvas.offsetWidth / 100 * this.player.x;
  var midy = canvas.offsetHeight / 100 * this.player.y;
  this.x =  midx - this.spriteWidth / 2
  this.y = midy - this.spriteHeight / 2
  return {x: midx, y: midy}
}

Sprite.prototype.drawLine = function(){
  var bx, by;
  var start = this.player.previousPlaces.shift();
  if(this.player.previousPlaces.length > 0 && !this.player.ghost){
    bx = start.x;
    by = start.y;
    this.ctx.beginPath();
    this.ctx.moveTo(bx, by);
    this.ctx.lineTo(
        this.player.previousPlaces[0].x, 
        this.player.previousPlaces[0].y)
    this.ctx.strokeStyle=this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

Sprite.prototype.drawAllLines = function(){
  while(this.player.previousPlaces.length > 0){
    this.drawLine();
  }
}
