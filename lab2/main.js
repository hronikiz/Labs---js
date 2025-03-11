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
    },
    {
      transaction_id: "T1003",
      transaction_date: "2023-01-25",
      transaction_amount: 200.00,
      transaction_type: "credit",
      transaction_description: "Payment of salary",
      merchant_name: "Employer Inc",
      card_type: "debit"
    },
    {
      transaction_id: "T1004",
      transaction_date: "2023-02-05",
      transaction_amount: 35.20,
      transaction_type: "debit",
      transaction_description: "Restaurant bill",
      merchant_name: "Delicious Food",
      card_type: "credit"
    },
    {
      transaction_id: "T1005",
      transaction_date: "2023-02-10",
      transaction_amount: 150.00,
      transaction_type: "debit",
      transaction_description: "Payment for clothes",
      merchant_name: "FashionShop",
      card_type: "credit"
    },
    {
      transaction_id: "T1006",
      transaction_date: "2023-02-15",
      transaction_amount: 300.00,
      transaction_type: "credit",
      transaction_description: "Payed Frilance",
      merchant_name: "Client XYZ",
      card_type: "debit"
    }
  ];
  
  /**
   * Возвращает массив уникальных типов транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Array} - Массив уникальных типов транзакций
   */
  function getUniqueTransactionTypes(transactions) {
    const typesSet = new Set();
    transactions.forEach(transaction => {
      typesSet.add(transaction.transaction_type);
    });
    return [...typesSet];
  }
  
  /**
   * Вычисляет общую сумму всех транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Number} - Общая сумма всех транзакций
   */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Вычисляет общую сумму транзакций за указанный год, месяц и день
   * @param {Array} transactions - Массив объектов транзакций
   * @param {Number} year - Год (необязательно)
   * @param {Number} month - Месяц (необязательно)
   * @param {Number} day - День (необязательно)
   * @returns {Number} - Общая сумма за указанные параметры даты
   */
  function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(transaction => {
      const transDate = new Date(transaction.transaction_date);
      let match = true;
      
      if (year !== undefined && transDate.getFullYear() !== year) {
        match = false;
      }
      
      if (month !== undefined && transDate.getMonth() + 1 !== month) {
        match = false;
      }
      
      if (day !== undefined && transDate.getDate() !== day) {
        match = false;
      }
      
      return match;
    }).reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Возвращает транзакции указанного типа
   * @param {Array} transactions - Массив объектов транзакций
   * @param {String} type - Тип транзакции (debit или credit)
   * @returns {Array} - Отфильтрованный массив транзакций
   */
  function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
  }
  
  /**
   * Возвращает транзакции в указанном диапазоне дат
   * @param {Array} transactions - Массив объектов транзакций
   * @param {String} startDate - Начальная дата в формате ГГГГ-ММ-ДД
   * @param {String} endDate - Конечная дата в формате ГГГГ-ММ-ДД
   * @returns {Array} - Отфильтрованный массив транзакций
   */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return transactions.filter(transaction => {
      const transDate = new Date(transaction.transaction_date);
      return transDate >= start && transDate <= end;
    });
  }
  
  /**
   * Возвращает транзакции от указанного продавца
   * @param {Array} transactions - Массив объектов транзакций
   * @param {String} merchantName - Название продавца
   * @returns {Array} - Отфильтрованный массив транзакций
   */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
  }
  
  /**
   * Вычисляет среднюю сумму транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Number} - Средняя сумма транзакций
   */
  function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
  }
  
  /**
   * Возвращает транзакции в указанном диапазоне сумм
   * @param {Array} transactions - Массив объектов транзакций
   * @param {Number} minAmount - Минимальная сумма
   * @param {Number} maxAmount - Максимальная сумма
   * @returns {Array} - Отфильтрованный массив транзакций
   */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => 
      transaction.transaction_amount >= minAmount && 
      transaction.transaction_amount <= maxAmount
    );
  }
  
  /**
   * Вычисляет общую сумму дебетовых транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Number} - Общая сумма дебетовых транзакций
   */
  function calculateTotalDebitAmount(transactions) {
    return transactions
      .filter(transaction => transaction.transaction_type === "debit")
      .reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Находит месяц с наибольшим количеством транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Number} - Номер месяца (1-12)
   */
  function findMostTransactionsMonth(transactions) {
    const monthCounts = {};
    
    transactions.forEach(transaction => {
      const month = new Date(transaction.transaction_date).getMonth() + 1;
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostMonth = null;
    
    for (const month in monthCounts) {
      if (monthCounts[month] > maxCount) {
        maxCount = monthCounts[month];
        mostMonth = parseInt(month);
      }
    }
    
    return mostMonth;
  }
  
  /**
   * Находит месяц с наибольшим количеством дебетовых транзакций
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Number} - Номер месяца (1-12)
   */
  function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = transactions.filter(t => t.transaction_type === "debit");
    return findMostTransactionsMonth(debitTransactions);
  }
  
  /**
   * Определяет, какой тип транзакций встречается чаще всего
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {String} - "debit", "credit" или "equal"
   */
  function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.transaction_type === "debit").length;
    const creditCount = transactions.filter(t => t.transaction_type === "credit").length;
    
    if (debitCount > creditCount) return "debit";
    if (creditCount > debitCount) return "credit";
    return "equal";
  }
  
  /**
   * Возвращает транзакции до указанной даты
   * @param {Array} transactions - Массив объектов транзакций
   * @param {String} date - Дата в формате ГГГГ-ММ-ДД
   * @returns {Array} - Отфильтрованный массив транзакций
   */
  function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
  }
  
  /**
   * Находит транзакцию по её ID
   * @param {Array} transactions - Массив объектов транзакций
   * @param {String} id - ID транзакции
   * @returns {Object|null} - Объект транзакции или null, если не найдено
   */
  function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id) || null;
  }
  
  /**
   * Сопоставляет транзакции для возврата массива описаний
   * @param {Array} transactions - Массив объектов транзакций
   * @returns {Array} - Массив описаний транзакций
   */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
  }
  
  function testFunctions() {
    console.log("Тестирование getUniqueTransactionTypes:");
    console.log(getUniqueTransactionTypes(transactions));
    
    console.log("\nТестирование calculateTotalAmount:");
    console.log(calculateTotalAmount(transactions));
    
    console.log("\nТестирование calculateTotalAmountByDate (Январь 2023):");
    console.log(calculateTotalAmountByDate(transactions, 2023, 1));
    
    console.log("\nТестирование getTransactionByType (debit):");
    console.log(getTransactionByType(transactions, "debit"));
    
    console.log("\nТестирование getTransactionsInDateRange:");
    console.log(getTransactionsInDateRange(transactions, "2023-01-01", "2023-01-31"));
    
    console.log("\nТестирование getTransactionsByMerchant:");
    console.log(getTransactionsByMerchant(transactions, "SuperMart"));
    
    console.log("\nТестирование calculateAverageTransactionAmount:");
    console.log(calculateAverageTransactionAmount(transactions));
    
    console.log("\nТестирование getTransactionsByAmountRange:");
    console.log(getTransactionsByAmountRange(transactions, 100, 200));
    
    console.log("\nТестирование calculateTotalDebitAmount:");
    console.log(calculateTotalDebitAmount(transactions));
    
    console.log("\nТестирование findMostTransactionsMonth:");
    console.log(findMostTransactionsMonth(transactions));
    
    console.log("\nТестирование findMostDebitTransactionMonth:");
    console.log(findMostDebitTransactionMonth(transactions));
    
    console.log("\nТестирование mostTransactionTypes:");
    console.log(mostTransactionTypes(transactions));
    
    console.log("\nТестирование getTransactionsBeforeDate:");
    console.log(getTransactionsBeforeDate(transactions, "2023-02-01"));
    
    console.log("\nТестирование findTransactionById:");
    console.log(findTransactionById(transactions, "T1003"));
    
    console.log("\nТестирование mapTransactionDescriptions:");
    console.log(mapTransactionDescriptions(transactions));
    
    // Тестирование с пустым массивом [extra]
    console.log("\nТестирование функций с пустым массивом:");
    const emptyArray = [];
    console.log("calculateTotalAmount:", calculateTotalAmount(emptyArray));
    console.log("calculateAverageTransactionAmount:", calculateAverageTransactionAmount(emptyArray));
    
    // Тестирование с одной транзакцией [extra]
    console.log("\nТестирование функций с одной транзакцией:");
    const singleTransaction = [transactions[0]];
    console.log("calculateTotalAmount:", calculateTotalAmount(singleTransaction));
    console.log("mostTransactionTypes:", mostTransactionTypes(singleTransaction));
  }
  
  testFunctions();
