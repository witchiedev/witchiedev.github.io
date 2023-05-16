let result = document.getElementById("result");

function addNumber(num) {
  if (result.value == "0") {
    result.value = num;
  } else {
    result.value += num;
  }
}

function addDecimal() {
  if (!result.value.includes(".")) {
    result.value += ".";
  }
}

function addOperator(op) {
  if (result.value != "0") {
    result.value += op;
  }
}

function clearResult() {
  result.value = "0";
}

function calculate() {
  let expression = result.value;
  let answer = eval(expression);
  result.value = answer;
}
