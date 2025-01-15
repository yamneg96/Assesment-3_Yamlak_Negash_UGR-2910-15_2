document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");

  let currentInput = "";
  let operator = null;
  let firstOperand = null;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");

      // Handle operators
      if (button.classList.contains("operator") && value !== "=") {
        if (currentInput && firstOperand === null) {
          firstOperand = parseFloat(currentInput);
          operator = value;
          currentInput = ""; // Clear input for the next number
        }
      } else {
        // Append numeric value
        currentInput += value;
        display.value = currentInput;
      }
    });
  });

  equalsButton.addEventListener("click", () => {
    if (firstOperand !== null && operator !== null && currentInput) {
      const secondOperand = parseFloat(currentInput);
      let result;

      switch (operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "*":
          result = firstOperand * secondOperand;
          break;
        case "/":
          result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
          break;
        default:
          result = "Error";
      }

      display.value = result;
      // Reset for next calculation
      currentInput = "";
      firstOperand = null;
      operator = null;
    }
  });

  clearButton.addEventListener("click", () => {
    display.value = "";
    currentInput = "";
    firstOperand = null;
    operator = null;
  });
});
