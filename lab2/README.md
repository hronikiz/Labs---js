# Iordatii_Ignatie

## Цель работы
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

## Условие
Создайте консольное приложение для анализа транзакций.

## Шаг 1. Создание массива транзакций
1. Создайте файл `main.js`.
2. Создайте массив объектов, где каждая транзакция имеет свойства:
   - `transaction_id` - уникальный идентификатор транзакции.
   - `transaction_date` - дата транзакции.
   - `transaction_amount` - сумма транзакции.
   - `transaction_type` - тип транзакции (приход или расход).
   - `transaction_description` - описание транзакции.
   - `merchant_name` - название магазина или сервиса.
   - `card_type` - тип карты (кредитная или дебетовая).

Пример кода:
```js
const transactions = [
  {
    transaction_id: "T1001",
    transaction_date: "2023-01-15",
    transaction_amount: 120.50,
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "debit"
  },
  {
    transaction_id: "T1002",
    transaction_date: "2023-01-20",
    transaction_amount: 50.00,
    transaction_type: "debit",
    transaction_description: "Gas station",
    merchant_name: "EnergyFuel",
    card_type: "credit"
  }
];
```

## Шаг 2. Реализация функций для анализа транзакций
Реализованы функции:
1. `getUniqueTransactionTypes(transactions)` - возвращает массив уникальных типов транзакций.
2. `calculateTotalAmount(transactions)` - вычисляет сумму всех транзакций.
3. `calculateTotalAmountByDate(transactions, year, month, day)` - вычисляет сумму транзакций за указанный период.
4. `getTransactionByType(transactions, type)` - возвращает транзакции указанного типа.
5. `getTransactionsInDateRange(transactions, startDate, endDate)` - возвращает массив транзакций в указанном диапазоне дат.
6. `getTransactionsByMerchant(transactions, merchantName)` - фильтрует транзакции по магазину.
7. `calculateAverageTransactionAmount(transactions)` - вычисляет среднее значение транзакций.
8. `getTransactionsByAmountRange(transactions, minAmount, maxAmount)` - фильтрует транзакции по сумме.
9. `calculateTotalDebitAmount(transactions)` - вычисляет общую сумму дебетовых транзакций.
10. `findMostTransactionsMonth(transactions)` - находит месяц с наибольшим количеством транзакций.
11. `findMostDebitTransactionMonth(transactions)` - определяет месяц с наибольшим числом дебетовых транзакций.
12. `mostTransactionTypes(transactions)` - определяет, каких транзакций больше (debit, credit или равное количество).
13. `getTransactionsBeforeDate(transactions, date)` - возвращает транзакции до указанной даты.
14. `findTransactionById(transactions, id)` - ищет транзакцию по `transaction_id`.
15. `mapTransactionDescriptions(transactions)` - возвращает массив описаний транзакций.
16. `getTransactionsByCardType(transactions, cardType)` - фильтрует транзакции по типу карты.

## Шаг 3. Тестирование функций
### 1. Проверьте работу функций на различных наборах данных
```js
console.log(getTransactionsByAmountRange(transactions, 100, 200));
```
📌 **![image](https://github.com/user-attachments/assets/36588f07-2637-40ca-addc-7ae02319201a)
**

### 2. Проверьте работу на пустом массиве транзакций [extra]
```js
console.log(calculateTotalAmount([]));
```
📌 **![image](https://github.com/user-attachments/assets/14106ee7-c16b-40c3-aae7-547f1bf15dc5)
*

### 3. Проверьте работу на массиве с одной транзакцией [extra]
```js
const singleTransaction = [
  {
    transaction_id: "T1003",
    transaction_date: "2023-01-25",
    transaction_amount: 200.00,
    transaction_type: "credit",
    transaction_description: "Payment of salary",
    merchant_name: "Employer Inc",
    card_type: "debit"
  }
];
console.log(calculateAverageTransactionAmount(singleTransaction));
```
📌 **![image](https://github.com/user-attachments/assets/f7a58fa4-366b-4aa0-9695-238418531aaa)
**

## Контрольные вопросы
### 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?
```js
const objects = [{ age: 20 }, { age: 25 }];
const ages = objects.map(obj => obj.age);
console.log(ages); // [20, 25]
```

