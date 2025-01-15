document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const clearButton = document.getElementById("clear");
  const deleteButton = document.getElementById("del");
  const equalsButton = document.getElementById("equals");
  const negButton = document.getElementById("neg");

  const stack = [];
  const operatorStack = [];

  let currentInput = "";

  // Operator precedence
  function precedence(op) {
    switch (op) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return -1;
    }
  }

  // Perform calculation
  function calculate() {
    const num2 = stack.pop();
    const num1 = stack.pop();
    const op = operatorStack.pop();
    let result;

    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          display.value = "Error";
          stack.length = 0; // Clear stack
          operatorStack.length = 0; // Clear operator stack
          return;
        }
        result = num1 / num2;
        break;
      default:
        throw new Error("Invalid operator");
    }
    stack.push(result);
  }

  // Handle button clicks
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");

      if (button.classList.contains("operator")) {
        if (currentInput !== "") {
          stack.push(parseFloat(currentInput));
          currentInput = "";
        }

        while (
          operatorStack.length > 0 &&
          precedence(operatorStack[operatorStack.length - 1]) >= precedence(value)
        ) {
          calculate();
        }
        operatorStack.push(value);
      } else if (value === ".") {
        if (!currentInput.includes(".")) {
          currentInput += ".";
        }
      } else {
        currentInput += value;
      }

      display.value = currentInput || stack[stack.length - 1] || "0";
    });
  });

  // Handle equals button
  equalsButton.addEventListener("click", () => {
    if (currentInput !== "") {
      stack.push(parseFloat(currentInput));
    }

    while (operatorStack.length > 0) {
      calculate();
    }

    if (stack.length === 1) {
      display.value = stack.pop();
    }
    currentInput = "";
  });

  // Handle clear button
  clearButton.addEventListener("click", () => {
    display.value = "";
    currentInput = "";
    stack.length = 0; // Clear stack
    operatorStack.length = 0; // Clear operator stack
  });

  // Handle delete button
  deleteButton.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || "0";
  });

  // Handle negative button
  negButton.addEventListener("click", () => {
    if (currentInput !== "") {
      currentInput = (-parseFloat(currentInput)).toString();
      display.value = currentInput;
    }
  });
});
