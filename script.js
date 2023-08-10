const display = document.querySelector('.display');
let firstOperand = '';
let operator = '';
let secondOperand = '';
let displayValue = '0';

function updateDisplay() {
  display.textContent = displayValue;
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      firstOperand = '';
      operator = '';
      secondOperand = '';
      displayValue = '0';
    } else if (value === '←') { // Backspace functionality
      if (!operator) {
        firstOperand = firstOperand.slice(0, -1);
        displayValue = firstOperand;
      } else {
        secondOperand = secondOperand.slice(0, -1);
        displayValue = secondOperand;
      }
    } else if (value === '=') {
      if (firstOperand && operator && secondOperand) {
        displayValue = operate(firstOperand, secondOperand, operator);
        firstOperand = displayValue;
        secondOperand = '';
        operator = '';
      }
    } else if (!isNaN(value) || value === '.') {
      if (!operator) {
        firstOperand += value;
      } else {
        secondOperand += value;
      }
      displayValue = (!operator) ? firstOperand : secondOperand;
    } else if (value === '/' || value === '*' || value === '-' || value === '+') {
      operator = value;
      secondOperand = '';
      displayValue = firstOperand + operator;
    }

    updateDisplay();
  });
});

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      if (b === 0) return 'Error';
      else return (a / b).toString();
  }
}

updateDisplay();