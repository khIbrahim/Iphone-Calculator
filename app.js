setInterval(() => {
    const heureElement = document.querySelector(".heure");
    const now = new Date();
    let heure = now.getHours();
    let minute = now.getMinutes();

    if (minute < 10) {
        minute = '0' + minute;
    }

    heureElement.innerHTML = `${heure}:${minute}`;
}, 1000);

let current = "0";
let storedResultat = 0;
let storedOperation = "";
let reset = false;

const resultSpan = document.querySelector(".result span");
const acButton = document.querySelector(".ac");

document.addEventListener('click', function (event) {
    const numberButton = event.target.closest(".number");
    const operatorButton = event.target.closest(".operator");

    document.querySelectorAll(".operator").forEach((btn) => {
        btn.style.backgroundColor = "darkorange";
        btn.style.color = "white";
    });

    if (event.target.closest(".ac")) {
        current = "0";
        storedResultat = 0;
        storedOperation = "";
        reset = false;
        resultSpan.textContent = current;
        acButton.textContent = "AC";
        return;
    }

    if (numberButton) {
        const number = numberButton.getAttribute("data-value");

        if (number !== "." && (current === "0" || reset)) {
            current = number;
            reset = false;
        } else {
            current += number;
        }

        resultSpan.textContent = current;

        if (current !== "0") {
            acButton.textContent = "C";
        }

        return;
    }

    if (operatorButton) {
        const operator = operatorButton.getAttribute("data-operator");

        operatorButton.style.transition = "background-color 0.5s ease";
        operatorButton.style.backgroundColor = "white";
        operatorButton.style.color = "darkorange";

        if (storedOperation) {
            storedResultat = operate(parseFloat(storedResultat), storedOperation, parseFloat(current))
            resultSpan.textContent = storedResultat
            current = storedResultat.toString()
        } else {
            storedResultat = current;
        }

        reset = true
        storedOperation = operator;
    }
});

function operate(storedValue, operation, value) {
    switch (operation) {
        case "+":
            return storedValue + value;
        case "-":
            return storedValue - value;
        case "*":
            return storedValue * value;
        case "/":
            return storedValue / value;
        default:
            return value;
    }
}
