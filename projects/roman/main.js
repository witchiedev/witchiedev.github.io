function convertToRoman(num) {
  const numerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  }
  var str = "";
  
  if(num > 3999){
    return "Your entered number has exceeded the roman numeral amount.";
  }

  for(var i of Object.keys(numerals)) {
    var q = Math.floor(num / numerals[i]);
    num -= q * numerals[i];
    str += i.repeat(q);
  }
  return str;
}

function convertToBase10(str) {
  let num;
  let newStr = str;
  let arr = [];

  for( let i of Object.keys(numerals)){
    for(let j = 0; j < newStr.length; j++){
      if(newStr.substring(0, i.length) == i){
        console.log(newStr.substring(0, i.length))
        newStr = newStr.replace(newStr.substring(0, i.length), '');
        arr.unshift(i);
      }
    }
  }
  num = 0;
  for( let i of Object.keys(numerals)){
    for(let j = 0; j < arr.length; j++){
      if(i == arr[0]){
        num += numerals[i];
        arr.shift();
      }
    }
  }
  if(num > 3999){
    return "The roman numerals you entered has exceeded the max value. ( 3999 )";
  }
  return num;
}

const romanHash = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
function convertToBase10(str) {
  let acc = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "I" && str[i + 1] === "V") {
      acc += 4;
      i++;
    } else if (str[i] === "I" && str[i + 1] === "X") {
      acc += 9;
      i++;
    } else if (str[i] === "X" && str[i + 1] === "L") {
      acc += 40;
      i++;
    } else if (str[i] === "X" && str[i + 1] === "C") {
      acc += 90;
      i++;
    } else if (str[i] === "C" && str[i + 1] === "D") {
      acc += 400;
      i++;
    } else if (str[i] === "C" && str[i + 1] === "M") {
      acc += 900;
      i++;
    } else {
      acc += romanHash[str[i]];
    }
  }

  if(acc > 3999){
    return "The roman numerals you entered has exceeded the max value. ( 3999 )";
  }

  return acc;
}

const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
  nodeB.parentNode.insertBefore(nodeA, nodeB);
  parentA.insertBefore(nodeB, siblingA);
}

function copy(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}