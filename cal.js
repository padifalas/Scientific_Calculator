
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");


let currentInput = "";
let previousInput = "";
let operator = null;

//  event listeners to  buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (value) {
            
            handleNumberInput(value);
        } else if (action) {
       
            handleAction(action);
        }
    });
});


function updateDisplay(value) {
    display.value = value || "0";
}


function handleNumberInput(value) {
    if (value === "." && currentInput.includes(".")) {
        return;
    }
    currentInput += value;
    updateDisplay(currentInput);
}


function handleAction(action) {
    if (action === "clear") {
        clearCalculator();
    } else if (action === "backspace") {
        backspace();
    } else if (action === "percent") {
        handlePercent();
    } else if (action === "equals") {
        calculateResult();
    } else {
        handleOperator(action);
    }
}

// function to clear  calculator
function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay("0");
}

// delete the last character from the current input
function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}

// parse/convert  current input to 
function handlePercent() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}


function handleOperator(action) {
    if (currentInput) {
        if (previousInput && operator) {
            
            calculateResult();
        }
        operator = action;
        previousInput = currentInput;
        currentInput = "";
    }
}


function calculateResult() {
    if (operator && previousInput && currentInput) {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "add":
                result = a + b;
                break;
            case "subtract":
                result = a - b;
                break;
            case "multiply":
                result = a * b;
                break;
            case "divide":
                result = b !== 0 ? a / b : "Error";
                break;
            default:
                result = "Error";  
        }

        currentInput = result.toString();
        operator = null;
        previousInput = "";
        updateDisplay(currentInput);
    }
}
