var wrapper = document.querySelector(".wrapper");
var table = document.querySelector(".table");
var reverted;
var gameForm = buildGameForm();
var gameBoard = buildGameBoard();
var canvas = gameBoard.canvas;
var playerList = gameBoard.playerList;
var ctx =  canvas.getContext("2d");
var game = new Game(canvas, playerList, ctx);

var player;
var colorChosen;

var keys =  {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

// Table of opposite directions
var invDirections = {
  right: "left",
  left: "right",
  up: "down",
  down: "up"
};

// Table of inverted x and y directions
var revertedDirections = {
  right: "down",
  left: "up",
  up: "left",
  down: "right"
}


var init = function (){
  choseGameScreen();
}

var choseGameScreen = function(){
  wrapper.appendChild(gameForm);
  wrapper.appendChild(table);
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
    wrapper.replaceChild(playerList, gameForm);
    wrapper.appendChild(canvas);
    enableMoving();
  }
}

var enableMoving = function(){
  window.addEventListener("keydown", moved, false);
  window.addEventListener("devicemotion", deviceMoved, false);
}

var sendDirection = function(direction){
  if(direction != player.direction && direction != invDirections[player.direction]){
    if(reverted)
      direction = revertedDirections[direction];
    socket.send(JSON.stringify({
      code: "playerMoved",
      playerID: player.id,
      direction: direction
    }));
  }
}

var deviceMoved = function(e){
  var acc = event.accelerationIncludingGravity;
  var direction;
  if(player.direction == "up" || player.direction == "down"){
    if (acc.x < -3) {
      direction = "right"
    } else if (acc.x > 3) {
      direction = "left"
    } 
  } else {
    if (acc.y < 0) {
      direction = "up"
    } else if (acc.y > 6) {
      direction = "down"
    }
  }

  if(direction){
    sendDirection(direction);
  }
}

var moved = function(e){
  var keyCode = e.keyCode;
  if(keys[keyCode])
    sendDirection(keys[keyCode]);
}

var gameFull = function(){
  alert("L'arène est pleine, veuilez en choisir une autre.");
}

var nameTaken = function(){
  alert("Ce nom est déjà pris.");
}

var enregistrerCouleur = function(color){
  colorChosen = color;
}
