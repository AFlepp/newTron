var buildGameForm = function(){
  var choseForm = document.createElement('form');
  var choseFieldset = document.createElement('fieldset');
  var choseLegend = document.createElement('legend');
  var choseGameLabel = document.createElement('label');
  var choseNameLabel = document.createElement('label');
  var choseGameTextInput = document.createElement('input');
  var choseNameTextInput= document.createElement('input');

  choseLegend.innerHTML = "Veuillez indiquer le nom de votre arène " + 
                          "et votre pseudo.";

  choseGameTextInput.setAttribute('type', 'text');
  choseGameTextInput.className += 'gameID';
  choseGameTextInput.setAttribute('style', 'margin-right: 2%');
  choseNameTextInput.className += 'playerID';
  choseNameTextInput.setAttribute('type', 'text');
  choseNameLabel.innerHTML = "Pseudo :";
  choseGameLabel.innerHTML = "Arène :";

  choseForm.setAttribute('style', 'margin-top: 18%');
  choseForm.appendChild(choseFieldset);
  choseFieldset.appendChild(choseLegend);
  choseFieldset.appendChild(choseGameLabel);
  choseFieldset.appendChild(choseNameLabel);
  choseNameLabel.appendChild(choseNameTextInput);
  choseGameLabel.appendChild(choseGameTextInput);

  return choseForm;
}

var buildCanvas = function(){
  var c = document.createElement('canvas');

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

  c.setAttribute('width', wrapperWidth);
  c.setAttribute('height', wrapperHeight);

  return c;
}
