export class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.MAX_INPUT_LENGTH = 15;
    this.clear();
  }

  appendNumber(number) {
    if (this.currentOperand.length >= this.MAX_INPUT_LENGTH) return;
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = '0';
    }
    this.currentOperand += number;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '' && this.previousOperand === '') return;
    
    if (this.currentOperand === '' && this.previousOperand !== '') {
      this.operation = operation;
      return;
    }

    if (this.previousOperand !== '') {
      this.compute();
    }
    
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  compute() {
    if (this.operation == null) return;
    if (this.currentOperand === '' && this.previousOperand === '') return;

    // Если currentOperand пуст, используем previousOperand как оба операнда
    const current = this.currentOperand === '' 
      ? parseFloat(this.previousOperand) 
      : parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    try {
      switch (this.operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
          if (current === 0) throw new Error('Деление на ноль');
          result = prev / current; 
          break;
        default: return;
      }
    } catch (error) {
      this.currentOperand = error.message;
      this.operation = undefined;
      this.previousOperand = '';
      this.updateDisplay();
      return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay(); 
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.operation != null) {
      this.displayElement.value = `${this.previousOperand} ${this.operation} ${this.currentOperand || ''}`.trim();
    } else {
      this.displayElement.value = this.currentOperand || this.previousOperand || '0';
    }
  }
}
