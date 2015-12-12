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

  // need the onload, otherwrcentage_x = options.x;
  this.percentage_y = options.y;
  this.size = this.canvas.height / 25;
  this.eight = this.size / 8;
  this.direction = options.direction;
  this.color = options.color;

  // need the onload, otherwise it just crashes...
  // scope change in onload, so we need a closure
  img.onload = function(){
    spr.width = this.width;
    spr.height = this.height;
    if(!spr.x){
      var realCoord = spr.getRealCoordinates(options.x, options.y);
      spr.x = realCoord[0];
      spr.y = realCoord[1];
    }
  }
};

Sprite.prototype.clear = function(x, y){
  this.ctx.clearRect(x || this.x, y || this.y, this.size / this.numberOfFrames, this.size);
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
        this.size,
        this.size
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
  // Declare borders
  var top = this.y + this.size <= 0, 
      bottom = this.y >= this.canvas.height, 
      left = this.x + this.size <= 0,
      right = this.x >= this.canvas.width; 
  // Set to true if has reached any border
  var reachBorder = ( top || bottom || left || right);
  
  switch(this.direction){
    case "up":
      if(top)
        this.y = this.canvas.height;
      this.y -= this.eight;
      break;
    case "down":
      if(bottom)
        this.y = 0;
      this.y += this.eight;
      break;
    case "left":
      if(left)
        this.x = this.canvas.width;
      this.x -= this.eight;
      break; 
    case "right":
      if(right)
        this.x = 0;
      this.x += this.eight;
      break;
  }
  // If it hasn't reached any border, just draw a line
  if(!reachBorder)
    this.drawLine();
}

Sprite.prototype.getRealCoordinates = function(x, y){
  var cx = canvas.offsetWidth / 100 * x - this.width / 2;
  var cy = canvas.offsetHeight / 100 * y - this.height / 2;
  return [cx, cy];
}

Sprite.prototype.resetCoordinates = function(){
  this.percentage_x = 50, this.percentage_y = 50;
  var realCoord = this.getRealCoordinates(this.percentage_x, this.percentage_y)
    this.x = realCoord[0], this.y = realCoord[1];
}

Sprite.prototype.drawLine = function(){

  //////////////TO DO : switch pour chaque direction, adapter la point de départ du trait pour qu'il parte du cul de la moto;,
  this.ctx.beginPath();
  var bx, by;
  switch(this.direction){
    case "up":
      this.ctx.moveTo(bx = this.x+this.size/2, by = this.y+this.size);
      this.ctx.lineTo(bx, by + this.eight);
      break;
    case "down":
      this.ctx.moveTo(bx = this.x+this.size/2, by = this.y);
      this.ctx.lineTo(bx, by - this.eight);
      break;
    case "left":
      this.ctx.moveTo(bx = this.x+this.size+this.eight, by = this.y+this.size/2);
      this.ctx.lineTo(bx + this.eight, by);
      break;
    case "right":
      this.ctx.moveTo(bx = this.x, by = this.y+this.size/2);
      this.ctx.lineTo(bx - this.eight, by);
      break;

  }
  this.ctx.strokeStyle=this.color;
  this.ctx.stroke();
  this.ctx.closePath();
}





/*
if(this.direction == "ard"){
    this.ctxt.clearRect((this.posW+imThird), (this.posH-2), imThird, imFull-2);
    this.ctxt.beginPath();
    this.ctxt.moveTo((this.posW+imHalf), this.posH+imHalf);
    this.ctxt.lineTo((this.posW+imHalf), (this.posH+imFull));
    this.ctxt.strokeStyle=this.moto[0];
    this.ctxt.stroke();
    this.ctxt.closePath();
  }
  
  if(this.direction == "deis"){
    this.ctxt.clearRect((this.posW-2), (this.posH+imThird), imFull-2, imThird);
    this.ctxt.beginPath();
    this.ctxt.moveTo((this.posW-2), this.posH+imHalf);
    this.ctxt.lineTo((this.posW+imHalf), (this.posH+imHalf));
    this.ctxt.strokeStyle=this.moto[0];
    this.ctxt.stroke();
    this.ctxt.closePath();
  }
  
  if(this.direction == "bun"){
    this.ctxt.clearRect((this.posW+imThird), (this.posH-2), imThird, imFull-2);
    this.ctxt.beginPath();
    this.ctxt.moveTo((this.posW+imHalf), this.posH-2);
    this.ctxt.lineTo((this.posW+imHalf), (this.posH+imHalf));
    this.ctxt.strokeStyle=this.moto[0];
    this.ctxt.stroke();
    this.ctxt.closePath();
  }

  if(this.direction == "cle"){
    this.ctxt.clearRect((this.posW-2), (this.posH+imThird), imFull-2, imThird);
    this.ctxt.beginPath();
    this.ctxt.moveTo((this.posW+imHalf), (this.posH+imHalf));
    this.ctxt.lineTo((this.posW+imFull), (this.posH+imHalf));
    this.ctxt.strokeStyle=this.moto[0];
    this.ctxt.stroke();
    this.ctxt.closePath();
  }
  
  //changement de direction
  this.direction = dir;*/
