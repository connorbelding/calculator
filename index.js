let displayValue = "0";

let storedNumber = null;
let storedOperator = null;

const operations = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
};

const calculatorKeys = [
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
    keyChar: "x",
    type: "operator",
  },
  {
    keyChar: ".",
    type: "decimal",
  },
  {
    keyChar: 0,
    type: "number",
  },
  {
    keyChar: "C",
    type: "clear",
  },
  {
    keyChar: "/",
    type: "operator",
  },
  {
    keyChar: "=",
    type: "resolve",
  },
  ,
  {
    keyChar: "←",
    type: "backspace",
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

function roundResult(num) {
  return Number(num.toFixed(6));
}

function checkForDecimal(string) {
  return string.includes(".");
}

function generateCalculatorButtons() {
  const calculatorButtonsContainer =
    document.getElementById("calculator-buttons");

  calculatorKeys.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = key.keyChar;
    if (key.type === "number") {
      button.classList.add("number");
      button.addEventListener("click", () => {
        if (displayValue === "0") displayValue = "";
        displayValue += key.keyChar;
        updateMainDisplay(displayValue);
      });
    }
    /////////////////////

    if (key.type === "operator") {
      button.classList.add("operator");
      button.addEventListener("click", () => {
        if (storedOperator) {
          const currentNumber = Number(displayValue);
          const result = roundResult(
            operate(storedOperator, {
              firstNum: storedNumber,
              secondNum: currentNumber,
            })
          );

          storedNumber = result;
          storedOperator = key.keyChar;

          displayValue = "0";
          updateMainDisplay(displayValue);
          updateSubDisplay(storedNumber, storedOperator);
        } else {
          storedOperator = key.keyChar;
          storedNumber = Number(displayValue);

          displayValue = "0";

          updateMainDisplay(displayValue);
          updateSubDisplay(storedNumber, storedOperator);
        }
      });
    }

    //////////////////////
    if (key.type === "decimal") {
      button.classList.add("decimal");
      button.addEventListener("click", () => {
        if (!checkForDecimal(displayValue)) {
          displayValue += ".";
          updateMainDisplay(displayValue);
        }
      });
    }
    //////////////////////
    if (key.type === "resolve") {
      button.classList.add("resolve");
      button.addEventListener("click", () => {
        if (!storedOperator) return;

        const currentNumber = Number(displayValue);
        const result = roundResult(
          operate(storedOperator, {
            firstNum: storedNumber,
            secondNum: currentNumber,
          })
        );

        displayValue = String(result);

        storedOperator = null;
        storedNumber = null;

        updateMainDisplay(displayValue);
        updateSubDisplay("", "");
      });
    }
    ////////////////////
    if (key.type === "clear") {
      button.classList.add("clear");
      button.addEventListener("click", () => {
        storedNumber = null;
        storedOperator = null;
        displayValue = "0";

        updateMainDisplay(displayValue);
        updateSubDisplay("", "");
      });
    }

    if (key.type === "backspace") {
      button.classList.add("backspace");
      button.addEventListener("click", () => {
        if (displayValue.length === 1) {
          displayValue = "0";
        } else {
          displayValue = displayValue.slice(0, displayValue.length - 1);
        }

        updateMainDisplay(displayValue);
      });
    }

    calculatorButtonsContainer.appendChild(button);
  });
}

generateCalculatorButtons();
