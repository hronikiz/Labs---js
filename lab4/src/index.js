/**
 * Основной модуль приложения для учета личных финансов
 * @module index
 */
import { addTransaction, deleteTransaction, getTransactions } from './transactions.js';
import { renderTransactionsTable, showTransactionDetails, setupEventListeners } from './ui.js';
import { calculateTotal } from './utils.js';

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderTransactionsTable(getTransactions());
    updateBalance();
});

/**
 * Обновляет отображение текущего баланса на странице
 */
export function updateBalance() {
    const totalElement = document.getElementById('total-balance');
    const total = calculateTotal(getTransactions());
    totalElement.textContent = total.toFixed(2);
    
    // Изменяем цвет в зависимости от баланса
    if (total > 0) {
        totalElement.style.color = 'green';
    } else if (total < 0) {
        totalElement.style.color = 'red';
    } else {
        totalElement.style.color = 'black';
    }
}

// Экспорт функций для доступа из других модулей
export { addTransaction, deleteTransaction, showTransactionDetails };
