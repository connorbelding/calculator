const operations = {
  add: "add",
  subtract: "subtract",
  multiply: "multiply",
  divide: "divide",
};

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operation, numbersObj) {
  switch (operation) {
    case operations.add: {
      return add(numbersObj.num1, numbersObj.num2);
    }
    case operations.subtract: {
      return subtract(numbersObj.num1, numbersObj.num2);
    }
    case operations.multiply: {
      return multiply(numbersObj.num1, numbersObj.num2);
    }
    case operations.divide: {
      return divide(numbersObj.num1, numbersObj.num2);
    }
    default:
      throw new Error("operate switch error");
  }
}
