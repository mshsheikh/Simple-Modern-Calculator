// Get all the necessary elements
const inputField = document.getElementById("input");
const buttons = document.querySelectorAll(".input-button");
const clearButton = document.getElementById("clear");
const eraseButton = document.getElementById("erase");
const equalButton = document.getElementById("equal");

let expression = "";

// Function to update the display
function updateDisplay() {
  // Show ÷ and × on the screen instead of / and *
  inputField.value = expression
    .replace(/\*/g, "×")
    .replace(/\//g, "÷") || "0";
}

// Add event listeners to the number and operator buttons
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.value;
    
    if (["+", "-", "×", "÷", "%"].includes(value)) {
      expression += convertOperator(value);
    } else {
      expression += value;
    }

    updateDisplay();
  });
});

// Add event listener to the clear button
clearButton.addEventListener("click", () => {
  expression = "";
  updateDisplay();
});

// Add event listener to the erase button (delete one character)
eraseButton.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  updateDisplay();
});

// Add event listener to the equal button to evaluate the expression
equalButton.addEventListener("click", () => {
  try {
    expression = eval(expression).toString();
  } catch (error) {
    expression = "Error";
  }
  updateDisplay();
});

// Helper function to convert the displayed operator to a valid JavaScript operator
function convertOperator(operator) {
  switch (operator) {
    case "×":
      return "*";
    case "÷":
      return "/";
    case "%":
      return "/100";
    default:
      return operator;
  }
}

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Handle numeric and operator keys
  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    expression += convertOperator(key);
  } else if (key === "Enter") {
    // Evaluate when Enter is pressed
    try {
      expression = eval(expression).toString();
    } catch (error) {
      expression = "Error";
    }
  } else if (key === "Backspace") {
    // Handle backspace (erase last character)
    expression = expression.slice(0, -1);
  } else if (key === "Escape") {
    // Handle Escape (clear the calculator)
    expression = "";
  }

  updateDisplay();
});

// Initial display update
updateDisplay();
