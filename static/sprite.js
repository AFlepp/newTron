// Building a sprite
function Sprite(options){
  var spr = this;
  var img = new Image();
  img.src = options.image;

  this.canvas = canvas;
  this.ctx = ctx;
  this.image = img;
  // percentage_ is the value from the canvas border in percent
  this.percentage_x = options.x;
  this.percentage_y = options.y;
  this.direction = options.direction;
  this.color = options.color;
  this.speed_y = options.speed;
  this.speed_x = options.speed * 9 / 16;

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
    }
  }
};

// Enable us to animate our sprites
Sprite.prototype.update = function(player){
  var difference_x = player.x - this.percentage_x;
  var difference_y = player.y - this.percentage_y;
  this.clear();
  this.direction = player.direction;
  if(difference_x > 50 || difference_x < -50 || difference_y > 50 || difference_y < -50){
    while(this.previousPlaces.length > 0){
      this.drawLine();
    }
  }
  this.percentage_x = player.x;
  this.percentage_y = player.y;
  this.previousPlaces.push(this.calculateRealCoordinates());
  this.draw();
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

Sprite.prototype.drawLine = function(){
  if(this.previousPlaces.length > 0){
    var bx, by;
    var start = this.previousPlaces.shift();
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
