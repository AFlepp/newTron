var buildGameForm = function(){
  var choseForm = document.createElement('form');
  var choseFieldset = document.createElement('fieldset');
  var choseLegend = document.createElement('legend');
  var choseGameLabel = document.createElement('label');
  var choseNameLabel = document.createElement('label');
  var choseGameTextInput = document.createElement('input');
  var choseNameTextInput = document.createElement('input');
  var findMeGameButton = document.createElement('button');
  var table = document.querySelector(".table");
  
  choseLegend.innerHTML = "Veuillez indiquer le nom de votre arène " + 
                          "et votre pseudo.";

  choseFieldset.className += 'field';
  choseGameTextInput.setAttribute('type', 'text');
  choseGameTextInput.className += 'gameID';
  choseGameTextInput.setAttribute('style', 'margin-right: 2%');
  choseNameTextInput.className += 'playerID';
  choseNameTextInput.setAttribute('type', 'text');
  choseNameLabel.innerHTML = "Pseudo :";
  choseGameLabel.innerHTML = "Arène :";
  findMeGameButton.className = "gameFinder";
  findMeGameButton.innerHTML = "Chercher une Arène";
  findMeGameButton.setAttribute('type', 'button');

  choseForm.setAttribute('style', 'margin-top: 18%');
  choseForm.appendChild(choseFieldset);
  choseFieldset.appendChild(findMeGameButton);
  choseFieldset.appendChild(choseLegend);
  choseFieldset.appendChild(choseGameLabel);
  choseFieldset.appendChild(choseNameLabel);
  choseFieldset.appendChild(table);
  choseNameLabel.appendChild(choseNameTextInput);
  choseGameLabel.appendChild(choseGameTextInput);

  var askForAGame = function(e){
    e.preventDefault();
    socket.send(JSON.stringify({
      code: "findGame"
    }));
  }
  
  findMeGameButton.addEventListener(
      'click', askForAGame, 'false'
      );

  return choseForm;
}

var buildGameBoard = function(){
  var c = document.createElement('canvas');
  c.setAttribute('style', 'display: inline-block');
  var playerList = document.createElement('aside');
  playerList.setAttribute('style', 'display: inline-block');

  wrapperWidth = wrapper.offsetWidth;
  wrapperHeight = wrapper.offsetHeight;
  
  // Adapte the canvas to the screen size
  // in a 16:9 fashion
  if(wrapperWidth / 16 * 9 > wrapperHeight) {
    reverted = false;
    wrapperWidth = wrapperHeight / 9 * 16;
  } else if (wrapperHeight / 16 * 9 > wrapperWidth) {
    reverted = true;
    wrapperHeight = wrapperWidth / 9 * 16;
  } else {
    if(wrapperWidth > wrapperHeight){
      reverted = false;
      wrapperHeight = wrapperWidth / 16 * 9;
    } else {
      reverted = true;
      wrapperWidth = wrapperHeight / 16 * 9;
    }
  }

  c.setAttribute('width', wrapperWidth/100*90);
  c.setAttribute('height', wrapperHeight/100*90);

  return {canvas: c, playerList: playerList};
}

var buildMessageDisplay = function(message){
	var box = document.createElement('h1');
	var wrapper = document.querySelector('.wrapper');
	box.className+='box';
	box.innerHTML = message;	
	wrapper.insertBefore(box, wrapper.firstChild);
	setTimeout(function(){wrapper.removeChild(box)}.bind(this), 1750);
}
