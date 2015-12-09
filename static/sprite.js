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
  this.size = this.canvas.height / 25 / 8;
  this.direction = options.direction;
  this.color = options.color;

  // need the onload, otherwise it just crashes...
  // scope change in onload, so we need a closure
  img.onload = function(){
    spr.width = this.width;
    spr.height = this.height;
    if(!spr.x){
      [spr.x, spr.y] = spr.getRealCoordinates(options.x, options.y);
    }
  }
};

Sprite.prototype.clear = function(){
  this.ctx.clearRect(this.x, this.y, this.canvas.height / 25 / this.numberOfFrames, this.canvas.height / 25);
};

Sprite.prototype.draw = function(){
  // Don't even try to draw something if the image isn't loaded.
  if(this.width){
    this.ctx.drawImage(
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        this.x,
        this.y,
        this.canvas.height / 25 / this.numberOfFrames,
        this.canvas.height / 25
        );
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
    if(this.width){
      this.move();
    }
  }
}

Sprite.prototype.move = function(){
  var oldx = this.x, oldy = this.y;
  switch(this.direction){
    case "up":
      if((this.y + this.size) <= 0)
        this.y = this.canvas.height;
      this.y -= this.size;
      break;
    case "down":
      if((this.y) >= this.canvas.height)
        this.y = 0;
      this.y += this.size;
      break;
    case "left":
      if((this.x + this.size) <= 0)
        this.x = this.canvas.width;
      this.x -= this.size;
      break;
    case "right":
      if(this.x >= this.canvas.width)
        this.x = 0;
      this.x += this.size;
      break;
  }
//if(oldy == this.y){
  //this.drawLine(oldx, (oldy+this.size/2), this.x, (this.y+this.size/2));
//}
  this.drawLine(oldx+this.size/2, oldy+this.size/2, this.x+this.size/2, this.y+this.size/2);
}

Sprite.prototype.getRealCoordinates = function(x, y){
  var cx = canvas.offsetWidth / 100 * x - this.width / 2;
  var cy = canvas.offsetHeight / 100 * y - this.height / 2;
  return [cx, cy];
}

Sprite.prototype.resetCoordinates = function(){
  [this.percentage_x, this.percentage_y] = [50, 50];
}

Sprite.prototype.drawLine = function(startx, starty, endx, endy){
  this.ctx.beginPath();
  this.ctx.moveTo(startx, starty);
  this.ctx.lineTo(endx, endy);
  this.ctx.strokeStyle=this.color;
  this.ctx.stroke();
  this.ctx.closePath();
}
