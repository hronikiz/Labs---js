/**
 * Модуль для работы с массивом транзакций
 * @module transactions
 */
import { generateId } from './utils.js';

// Массив для хранения транзакций
let transactions = [];

/**
 * Добавляет новую транзакцию в массив
 * @param {Object} transactionData - Данные о транзакции
 * @param {number} transactionData.amount - Сумма транзакции
 * @param {string} transactionData.category - Категория транзакции
 * @param {string} transactionData.description - Описание транзакции
 * @returns {Object} - Созданный объект транзакции
 */
export function addTransaction(transactionData) {
    const { amount, category, description } = transactionData;
    
    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: parseFloat(amount),
        category,
        description
    };
    
    transactions.push(transaction);
    return transaction;
}

/**
 * Удаляет транзакцию из массива по её id
 * @param {string} id - Идентификатор транзакции для удаления
 * @returns {boolean} - true если транзакция была найдена и удалена, иначе false
 */
export function deleteTransaction(id) {
    const initialLength = transactions.length;
    transactions = transactions.filter(transaction => transaction.id !== id);
    return transactions.length !== initialLength;
}

/**
 * Возвращает транзакцию по её id
 * @param {string} id - Идентификатор искомой транзакции
 * @returns {Object|null} - Объект транзакции или null, если транзакция не найдена
 */
export function getTransactionById(id) {
    return transactions.find(transaction => transaction.id === id) || null;
}

/**
 * Возвращает массив всех транзакций
 * @returns {Array} - Массив объектов транзакций
 */
export function getTransactions() {
    return transactions;
}

/**
 * Очищает массив транзакций
 */
export function clearTransactions() {
    transactions = [];
}
