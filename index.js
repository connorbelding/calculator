let displayValue = "0";

const currentOperationNumbers = {
  firstNum: null,
  secondNum: null,
};

let currentOperator = null;

const operations = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
};

const calculatorKeys = [
  {
    keyChar: 1,
    type: "number",
  },
  {
    keyChar: 2,
    type: "number",
  },
  {
    keyChar: 3,
    type: "number",
  },
  {
    keyChar: "+",
    type: "operator",
  },
  {
    keyChar: 4,
    type: "number",
  },
  {
    keyChar: 5,
    type: "number",
  },
  {
    keyChar: 6,
    type: "number",
  },
  {
    keyChar: "-",
    type: "operator",
  },
  {
    keyChar: 7,
    type: "number",
  },
  {
    keyChar: 8,
    type: "number",
  },
  {
    keyChar: 9,
    type: "number",
  },
  {
    keyChar: "x",
    type: "operator",
  },
  {
    keyChar: "C",
    type: "clear",
  },
  {
    keyChar: 0,
    type: "number",
  },
  {
    keyChar: "=",
    type: "resolve",
  },
  {
    keyChar: "/",
    type: "operator",
  },
];

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

function operate(operator, numbersObj) {
  switch (operator) {
    case operations.add: {
      return add(numbersObj.firstNum, numbersObj.secondNum);
    }
    case operations.subtract: {
      return subtract(numbersObj.firstNum, numbersObj.secondNum);
    }
    case operations.multiply: {
      return multiply(numbersObj.firstNum, numbersObj.secondNum);
    }
    case operations.divide: {
      return divide(numbersObj.firstNum, numbersObj.secondNum);
    }
    default:
      throw new Error("operate switch error");
  }
}

function checkForInfinity(operator, numbersObj) {
  const result = operate(operator, numbersObj);
  if (result === Infinity) return true;
  return false;
}

function updateMainDisplay(string) {
  const display = document.getElementById("calculator-display-main");

  display.textContent = string;
}

function updateSubDisplay(subValue, operator) {
  const subDisplay = document.getElementById("calculator-display-sub-number");
  const operatorDisplay = document.getElementById(
    "calculator-display-sub-operator"
  );

  subDisplay.textContent = subValue;
  operatorDisplay.textContent = operator;
}

function clearCalculator() {
  currentOperationNumbers.firstNum = null;
  currentOperationNumbers.secondNum = null;

  currentOperator = null;
  displayValue = "0";

  updateMainDisplay(displayValue);
  updateSubDisplay("", "");
}

function generateCalculatorButtons() {
  const calculatorButtonsContainer =
    document.getElementById("calculator-buttons");

  calculatorKeys.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = key.keyChar;

    if (key.type === "number") {
      button.addEventListener("click", () => {
        if (displayValue === "0") displayValue = "";
        displayValue += key.keyChar;
        updateMainDisplay(displayValue);
      });
    }
    if (key.type === "operator") {
      button.addEventListener("click", () => {
        if (currentOperationNumbers.firstNum) {
          currentOperationNumbers.secondNum = Number(displayValue);
          const result = operate(currentOperator, currentOperationNumbers);

          console.log(currentOperationNumbers, currentOperator, result);

          currentOperationNumbers.firstNum = result;
          currentOperationNumbers.secondNum = null;

          displayValue = "0";
          currentOperator = key.keyChar;

          updateMainDisplay(displayValue);
          updateSubDisplay(currentOperationNumbers.firstNum, currentOperator);
        } else {
          currentOperationNumbers.firstNum = Number(displayValue);
          currentOperator = key.keyChar;

          displayValue = "0";

          updateMainDisplay(displayValue);
          updateSubDisplay(currentOperationNumbers.firstNum, currentOperator);
        }
      });
    }
    if (key.type === "clear") {
      button.addEventListener("click", () => {
        clearCalculator();
      });
    }

    if (key.type === "resolve") {
      button.addEventListener("click", () => {
        if (!currentOperationNumbers.firstNum && !currentOperator) return;
        if (
          checkForInfinity(currentOperator, {
            firstNum: currentOperationNumbers.firstNum,
            secondNum: Number(displayValue),
          })
        ) {
          alert("DO NOT DIVIDE BY ZERO!!!!!!!!");
          clearCalculator();
          return;
        }
        currentOperationNumbers.secondNum = Number(displayValue);

        const result = operate(currentOperator, currentOperationNumbers);

        displayValue = result;

        currentOperationNumbers.firstNum = null;
        currentOperationNumbers.secondNum = null;
        currentOperator = null;

        updateMainDisplay(displayValue);
        updateSubDisplay("", "");
      });
    }

    calculatorButtonsContainer.appendChild(button);
  });
}
generateCalculatorButtons();
