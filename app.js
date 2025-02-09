const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operation = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");

        if (value) {
            handleNumber(value);
        } else if (action) {
            handleAction(action);
        }

        updateDisplay();
    });
});

function handleNumber(num) {
    if (currentInput === "0" || currentInput === "-0") {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleAction(action) {
    switch (action) {
        case "clear":
            currentInput = "0";
            previousInput = "";
            operation = null;
            break;
        case "sign":
            currentInput = (parseFloat(currentInput) * -1).toString();
            break;
        case "percent":
            currentInput = (parseFloat(currentInput) / 100).toString();
            break;
        case "divide":
        case "multiply":
        case "subtract":
        case "add":
            if (previousInput && operation) {
                calculate();
            }
            previousInput = currentInput;
            currentInput = "0";
            operation = action;
            break;
        case "calculate":
            if (previousInput && operation) {
                calculate();
                operation = null;
            }
            break;
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operation) {
        case "add":
            result = prev + curr;
            break;
        case "subtract":
            result = prev - curr;
            break;
        case "multiply":
            result = prev * curr;
            break;
        case "divide":
            result = prev / curr;
            break;
    }

    currentInput = result.toString();
    previousInput = "";
}

function updateDisplay() {
    display.textContent = currentInput;
}