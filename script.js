// Select elements
const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const decimal = document.getElementById('decimal');
const backspace = document.getElementById('backspace');

// Variables to store numbers and operator
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resultDisplayed = false;

// Math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error: ÷0!' : a / b; }

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  let res;
  switch(op) {
    case '+': res = add(a, b); break;
    case '-': res = subtract(a, b); break;
    case '*': res = multiply(a, b); break;
    case '/': res = divide(a, b); break;
  }
  if(typeof res === 'number') res = parseFloat(res.toFixed(6)); // limit decimals
  return res;
}

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle number input
numbers.forEach(btn => {
  btn.addEventListener('click', () => {
    if(resultDisplayed) {
      firstNumber = '';
      resultDisplayed = false;
    }
    if(!currentOperator) {
      firstNumber += btn.dataset.num;
      updateDisplay(firstNumber);
    } else {
      secondNumber += btn.dataset.num;
      updateDisplay(secondNumber);
    }
  });
});

// Handle operator input
operators.forEach(btn => {
  btn.addEventListener('click', () => {
    if(firstNumber && secondNumber) {
      firstNumber = operate(currentOperator, firstNumber, secondNumber);
      secondNumber = '';
      updateDisplay(firstNumber);
    }
    currentOperator = btn.dataset.op;
    resultDisplayed = false;
  });
});

// Handle equals
equals.addEventListener('click', () => {
  if(firstNumber && currentOperator && secondNumber) {
    firstNumber = operate(currentOperator, firstNumber, secondNumber);
    secondNumber = '';
    currentOperator = '';
    updateDisplay(firstNumber);
    resultDisplayed = true;
  }
});

// Clear calculator
clear.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  currentOperator = '';
  updateDisplay('0');
});

// Decimal
decimal.addEventListener('click', () => {
  if(!currentOperator && !firstNumber.includes('.')) {
    firstNumber += firstNumber ? '.' : '0.';
    updateDisplay(firstNumber);
  } else if(currentOperator && !secondNumber.includes('.')) {
    secondNumber += secondNumber ? '.' : '0.';
    updateDisplay(secondNumber);
  }
});

// Backspace
backspace.addEventListener('click', () => {
  if(currentOperator && secondNumber) {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || '0');
  } else if(!currentOperator && firstNumber) {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || '0');
  }
});

// Keyboard support
document.addEventListener('keydown', e => {
  if(e.key >= '0' && e.key <= '9') document.querySelector(`.number[data-num="${e.key}"]`).click();
  if(['+', '-', '*', '/'].includes(e.key)) document.querySelector(`.operator[data-op="${e.key}"]`).click();
  if(e.key === 'Enter') equals.click();
  if(e.key === 'Backspace') backspace.click();
  if(e.key === 'Escape') clear.click();
  if(e.key === '.') decimal.click();
});