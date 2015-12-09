var wrapper = document.querySelector(".wrapper");

var gameForm = buildGameForm();
var canvas = buildCanvas();
var ctx =  canvas.getContext("2d");
var game = new Game();

var player;
var colorChosen;

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
  if(wrapper.contains(canvas)){
    wrapper.replaceChild(gameForm, canvas);
  } else {
    wrapper.replaceChild(canvas, gameForm);
    enableMoving();
  }
}

var enableMoving = function(){
  window.addEventListener("keydown", moved, false);
}

var moved = function(e){
  console.log(e.keyCode)
  var keyCode = e.keyCode;
  socket.send(JSON.stringify({
    code: "playerMoved",
    playerID: player.id,
    direction: {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    }[keyCode]
  }));
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
