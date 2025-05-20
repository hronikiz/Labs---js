import { Calculator } from './calculator.js';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const calculator = new Calculator(display);
const operatorButtons = document.querySelectorAll('[data-operator]');

// Обработка кликов по кнопкам
buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 100);
    
    if (button.dataset.number !== undefined) {
      calculator.appendNumber(button.dataset.number);
    }

    if (button.dataset.operator !== undefined) {
      calculator.chooseOperation(button.dataset.operator);
      operatorButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    }

    if (button.dataset.action === 'equals') {
      calculator.compute();
      operatorButtons.forEach(btn => btn.classList.remove('active'));
    }

    if (button.dataset.action === 'clear') {
      calculator.clear();
      operatorButtons.forEach(btn => btn.classList.remove('active'));
    }
  });
});

// Обработка ввода с клавиатуры
document.addEventListener('keydown', (e) => {
  if (/[0-9.]/.test(e.key)) {
    calculator.appendNumber(e.key);
    const button = document.querySelector(`[data-number="${e.key}"]`);
    if (button) button.classList.add('clicked');
  } else if (/[+\-*/]/.test(e.key)) {
    calculator.chooseOperation(e.key);
    operatorButtons.forEach(btn => btn.classList.remove('active'));
    const button = document.querySelector(`[data-operator="${e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key}"]`);
    if (button) button.classList.add('active');
  } else if (e.key === 'Enter' || e.key === '=') {
    calculator.compute();
    operatorButtons.forEach(btn => btn.classList.remove('active'));
    const button = document.querySelector('[data-action="equals"]');
    if (button) button.classList.add('clicked');
  } else if (e.key === 'Escape') {
    calculator.clear();
    operatorButtons.forEach(btn => btn.classList.remove('active'));
    const button = document.querySelector('[data-action="clear"]');
    if (button) button.classList.add('clicked');
  }
  
  setTimeout(() => {
    document.querySelectorAll('.clicked').forEach(btn => btn.classList.remove('clicked'));
  }, 100);
});
