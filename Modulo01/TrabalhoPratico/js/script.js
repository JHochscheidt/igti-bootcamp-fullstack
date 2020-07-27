window.addEventListener('load', start);

var colorR = (colorG = colorB = null);

function start() {
  function changeColor(event) {
    colorR = getValueRange('red');
    setInputText('redTxt').setAttribute('value', colorR);
    colorG = getValueRange('green');
    setInputText('greenTxt').setAttribute('value', colorG);
    colorB = getValueRange('blue');
    setInputText('blueTxt').setAttribute('value', colorB);

    let div = document.querySelector('.bgcolor');
    // console.log(div);
    div.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
  }

  changeColor(event);

  var rangedInputs = document.querySelectorAll("input[type='range']");
  // console.log(rangedInputs);
  rangedInputs.forEach((range) => {
    range.addEventListener('input', changeColor);
    range.addEventListener('keyup', changeColor);
  });
}

function getValueRange(id) {
  let value = document.getElementById(id).value;
  return value;
}

function setInputText(id) {
  let inputText = document.getElementById(id);
  return inputText;
}
