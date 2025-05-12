/**
 * Вспомогательный модуль с утилитами
 * @module utils
 */

/**
 * Генерирует уникальный идентификатор
 * @returns {string} - Уникальный идентификатор
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Форматирует дату в читаемый формат
 * @param {Date} date - Объект даты
 * @returns {string} - Отформатированная строка даты
 */
export function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const options = { 
        year: 'numeric', 
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleString('ru-RU', options);
}

/**
 * Обрезает текст до указанного количества слов
 * @param {string} text - Исходный текст
 * @param {number} wordCount - Количество слов
 * @returns {string} - Обрезанный текст
 */
export function truncateText(text, wordCount) {
    const words = text.split(' ');
    if (words.length <= wordCount) {
        return text;
    }
    return words.slice(0, wordCount).join(' ') + '...';
}

/**
 * Подсчитывает общую сумму транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {number} - Общая сумма
 */
export function calculateTotal(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Валидирует данные формы добавления транзакции
 * @param {Object} formData - Данные формы
 * @param {string} formData.amount - Сумма транзакции
 * @param {string} formData.category - Категория транзакции
 * @param {string} formData.description - Описание транзакции
 * @returns {Object} - Объект с ошибками валидации
 */
export function validateForm(formData) {
    const errors = {};
    
    // Проверка суммы
    if (!formData.amount) {
        errors.amount = 'Пожалуйста, введите сумму';
    } else if (isNaN(parseFloat(formData.amount))) {
        errors.amount = 'Сумма должна быть числом';
    }
    
    // Проверка категории
    if (!formData.category) {
        errors.category = 'Пожалуйста, выберите категорию';
    }
    
    // Проверка описания
    if (!formData.description) {
        errors.description = 'Пожалуйста, введите описание';
    } else if (formData.description.length < 5) {
        errors.description = 'Описание должно содержать минимум 5 символов';
    }
    
    return errors;
}
