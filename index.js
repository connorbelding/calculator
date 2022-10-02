let display = "0";

const operations = {
  add: "add",
  subtract: "subtract",
  multiply: "multiply",
  divide: "divide",
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
    keyChar: "*",
    type: "operator",
  },
  {
    keyChar: "C",
    type: "operator",
  },
  {
    keyChar: 0,
    type: "number",
  },
  {
    keyChar: "=",
    type: "operator",
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

function updateDisplay(string) {
  const display = document.getElementById("calculator-display");

  display.textContent = string;
}

function generateCalculatorButtons() {
  const calculatorButtonsContainer =
    document.getElementById("calculator-buttons");

  calculatorKeys.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = key.keyChar;

    if (key.type === "number") {
      button.addEventListener("click", () => {
        if (display === "0") display = "";
        display += key.keyChar;
        updateDisplay(display);
      });
    }

    calculatorButtonsContainer.appendChild(button);
  });
}

generateCalculatorButtons();
