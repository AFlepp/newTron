var wrapper = document.querySelector(".wrapper");

var gameForm = buildGameForm();
var canvas = buildCanvas();
var ctx =  canvas.getContext("2d");
var game = new Game(canvas, ctx);

var player;
var colorChosen;

var keys =  {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

var invDirections = {
  right: "left",
  left: "right",
  up: "down",
  down: "up"
}

var init = function (){
  choseGameScreen();
}

var choseGameScreen = function(){
  wrapper.appendChild(gameForm);
  var submits = document.querySelectorAll('img');

  var submitToSocket = function(e){
    e.preventDefault();
    var gameID = document.querySelector('.gameID').value;
    var playerID = document.querySelector('.playerID').value;
    socket.send(JSON.stringify({
      code: "connectionDemand", 
      gameID: gameID, 
      playerID: playerID
    }));
  }
  for(var i = 0 ; i < submits.length ; i++){
    submits[i].addEventListener('click', submitToSocket, false);
  }
}

init();

// --------------------- Triggered in socketHandling.js -----------------------

var togglePageContent = function(){
  var table = document.querySelector(".table");
  if(wrapper.contains(canvas)){
    table.style.display="table";
    wrapper.replaceChild(gameForm, canvas);
  } else {
    table.style.display="none";
    wrapper.replaceChild(canvas, gameForm);
    enableMoving();
  }
}

var enableMoving = function(){
  window.addEventListener("keydown", moved, false);
  window.addEventListener("devicemotion", deviceMoved, false);
}

var deviceMoved = function(e){
  var acc = event.accelerationIncludingGravity;
  var direction;
  if (acc.x < 2) {
    direction = "right"
  } else if (acc.x > -2) {
    direction = "left"
  } 
  if (acc.y < -2) {
    direction = "up"
  } else if (acc.y > 2) {
    direction = "down"
  }

  if(direction != player.direction && 
      direction != invDirections[player.direction])
  {
    socket.send(JSON.stringify({
      code: "playerMoved",
      playerID: player.id,
      direction: direction
    }));
  }
}

var moved = function(e){
  var keyCode = e.keyCode;
  
  if(keys[keyCode] && keys[keyCode] != invDirections[player.Direction]){
  socket.send(JSON.stringify({
      code: "playerMoved",
      playerID: player.id,
      direction: keys[keyCode]
    }));
  }
}

var gameFull = function(){
  alert("This game is full, soz");
}

var nameTaken = function(){
  alert("You can't chose that name, soz");
}

var enregistrerCouleur = function(color){
  colorChosen = color;
}
