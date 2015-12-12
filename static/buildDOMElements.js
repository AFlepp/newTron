
var buildGameForm = function(){
  var choseForm = document.createElement('form');
  var choseFieldset = document.createElement('fieldset');
  var choseLegend = document.createElement('legend');
  var choseGameLabel = document.createElement('label');
  var choseNameLabel = document.createElement('label');
  var choseGameTextInput = document.createElement('input');
  var choseNameTextInput= document.createElement('input');
  var choseSubmitInput = document.createElement('input');

  choseLegend.innerHTML = "Please, enter your game name as" + 
                          " well as your player name.";

  choseGameTextInput.setAttribute('type', 'text');
  choseGameTextInput.className += 'gameID';
  choseNameTextInput.className += 'playerID';
  choseNameTextInput.setAttribute('type', 'text');
  choseSubmitInput.setAttribute('type', 'submit');
  choseNameLabel.innerHTML = "Name :";
  choseGameLabel.innerHTML = "Game :";

  choseForm.appendChild(choseFieldset);
  choseFieldset.appendChild(choseLegend);
  choseFieldset.appendChild(choseGameLabel);
  choseFieldset.appendChild(choseNameLabel);
  choseNameLabel.appendChild(choseNameTextInput);
  choseGameLabel.appendChild(choseGameTextInput);
  choseFieldset.appendChild(choseSubmitInput);

  return choseForm;
}

var buildCanvas = function(){
  var c = document.createElement('canvas');

  wrapperWidth = wrapper.offsetWidth;
  wrapperHeight = wrapper.ofsetHeight;
  
  // Adapte the canvas to the screen size
  // in a 16:9 fashion
  if(wrapperWidth / 16 * 9 > wrapperHeight){
    wrapperWidth = wrapperHeight / 9 * 16;
  } else {
    wrapperHeight = wrapperWidth / 16 * 9;
  }

  c.setAttribute('width', wrapperWidth);
  c.setAttribute('height', wrapperHeight);

  return c;
}
