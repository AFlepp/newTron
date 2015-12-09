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
  this.speed = this.canvas.height / 25 / 8;
  this.direction = options.direction;

  // need the onload, otherwise it just crashes...
  // scope change in onload, so we need a closure
  img.onload = function(){
    spr.width = this.width;
    spr.height = this.height;
    [spr.x, spr.y] = spr.getRealCoordinates(options.x, options.y);
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
  switch(this.direction){
    case "up":
      this.y -= this.speed;
      break;
    case "down":
      this.y += this.speed;
      break;
    case "left":
      this.x -= this.speed;
      break;
    case "right":
      this.x += this.speed;
      break;
  }
}

Sprite.prototype.getRealCoordinates = function(x, y){
  var cx = canvas.offsetWidth / 100 * x - this.width / 2;
  var cy = canvas.offsetHeight / 100 * y - this.height / 2;
  return [cx, cy];
}

Sprite.prototype.resetCoordinates = function(){
  [this.percentage_x, this.percentage_y] = [50, 50];
}
