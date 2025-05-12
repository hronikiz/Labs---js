/**
 * Модуль для работы с пользовательским интерфейсом
 * @module ui
 */
import { addTransaction, deleteTransaction, getTransactionById, getTransactions } from './transactions.js';
import { formatDate, truncateText, validateForm } from './utils.js';
import { updateBalance } from './index.js';

/**
 * Устанавливает обработчики событий для элементов страницы
 */
export function setupEventListeners() {
    // Обработчик отправки формы добавления транзакции
    const form = document.getElementById('transaction-form');
    form.addEventListener('submit', handleFormSubmit);
    
    // Делегирование событий для таблицы транзакций
    const transactionsTable = document.getElementById('transactions-table');
    transactionsTable.addEventListener('click', handleTableClick);
}

/**
 * Обрабатывает отправку формы добавления транзакции
 * @param {Event} event - Объект события
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    
    const formData = {
        amount: amountInput.value,
        category: categoryInput.value,
        description: descriptionInput.value
    };
    
    // Валидация формы
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
        displayValidationErrors(validationErrors);
        return;
    }
    
    // Если валидация прошла успешно, добавляем транзакцию
    const transaction = addTransaction(formData);
    addTransactionToTable(transaction);
    updateBalance();
    
    // Очищаем форму и убираем сообщения об ошибках
    form.reset();
    clearValidationErrors();
}

/**
 * Отображает ошибки валидации формы
 * @param {Object} errors - Объект с ошибками валидации
 */
function displayValidationErrors(errors) {
    clearValidationErrors();
    
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement && inputElement) {
            errorElement.textContent = errors[field];
            inputElement.classList.add('invalid');
        }
    });
}

/**
 * Очищает сообщения об ошибках валидации
 */
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('input, select, textarea');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('invalid');
    });
}

/**
 * Обрабатывает клики по таблице транзакций
 * @param {Event} event - Объект события
 */
function handleTableClick(event) {
    const target = event.target;
    
    // Если клик был по кнопке удаления
    if (target.classList.contains('delete-btn')) {
        const row = target.closest('tr');
        const transactionId = row.dataset.id;
        
        if (deleteTransaction(transactionId)) {
            row.remove();
            updateBalance();
            
            // Если удалили транзакцию, которая была выбрана, очищаем детали
            const detailsContent = document.getElementById('details-content');
            if (detailsContent.dataset.id === transactionId) {
                detailsContent.innerHTML = '<p>Выберите транзакцию для просмотра подробной информации</p>';
                detailsContent.dataset.id = '';
            }
        }
    } 
    // Если клик был по строке таблицы
    else if (target.tagName === 'TD' || target.closest('td')) {
        const row = target.closest('tr');
        if (row && row.dataset.id) {
            showTransactionDetails(row.dataset.id);
        }
    }
}

/**
 * Добавляет транзакцию в таблицу
 * @param {Object} transaction - Объект транзакции
 */
function addTransactionToTable(transaction) {
    const tableBody = document.getElementById('transactions-body');
    const row = document.createElement('tr');
    
    row.dataset.id = transaction.id;
    row.className = transaction.amount >= 0 ? 'income' : 'expense';
    
    row.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${truncateText(transaction.description, 4)}</td>
        <td>${transaction.amount.toFixed(2)} ₽</td>
        <td><button class="delete-btn">Удалить</button></td>
    `;
    
    tableBody.prepend(row);
}

/**
 * Отображает детальную информацию о транзакции
 * @param {string} transactionId - Идентификатор транзакции
 */
export function showTransactionDetails(transactionId) {
    const transaction = getTransactionById(transactionId);
    const detailsContent = document.getElementById('details-content');
    
    if (transaction) {
        detailsContent.innerHTML = `
            <h3>${transaction.amount >= 0 ? 'Доход' : 'Расход'}</h3>
            <p><strong>Дата:</strong> ${formatDate(transaction.date)}</p>
            <p><strong>Категория:</strong> ${transaction.category}</p>
            <p><strong>Сумма:</strong> ${transaction.amount.toFixed(2)} ₽</p>
            <p><strong>Описание:</strong> ${transaction.description}</p>
        `;
        detailsContent.dataset.id = transactionId;
    }
}

/**
 * Отрисовывает таблицу транзакций
 * @param {Array} transactions - Массив транзакций
 */
export function renderTransactionsTable(transactions) {
    const tableBody = document.getElementById('transactions-body');
    tableBody.innerHTML = '';
    
    if (transactions.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="5" style="text-align: center;">Нет транзакций</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    // Сортируем транзакции по дате (от новых к старым)
    const sortedTransactions = [...transactions].sort((a, b) => b.date - a.date);
    
    sortedTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        row.dataset.id = transaction.id;
        row.className = transaction.amount >= 0 ? 'income' : 'expense';
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.category}</td>
            <td>${truncateText(transaction.description, 4)}</td>
            <td>${transaction.amount.toFixed(2)} ₽</td>
            <td><button class="delete-btn">Удалить</button></td>
        `;
        
        tableBody.appendChild(row);
    });
}
