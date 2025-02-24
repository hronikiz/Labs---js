# Noroc_Eugeniu
# Лабораторная работа №1. Введение в JavaScript

## Задание 1  
### Запуск кода в браузере  
1. Открываю консоль разработчика (F12 → Console).  
2. Ввожу команду `console.log("Hello, world!");`.  
3. Ввожу `2 + 3` и получаю результат:  
![image](https://github.com/user-attachments/assets/131fc885-b6f8-4cad-b25b-014aabab033b)  

### Запуск HTML-страницы с JavaScript  
1. Создаю файл `index.html` и вставляю в него код:  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="script.js"></script>
    <title>Привет, мир!</title>
</head>
<body>
    <script>
        alert("Привет, мир!");
        console.log("Hello, console!");
    </script>
</body>
</html>
```

2. Подключаю script.js файл с помощью команды:  
   ```js
   <script src="script.js"></script>
   ```
4. Заполняю script.js кодом:  
```js
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");
```
4. Получаю результат:  
![image](https://github.com/user-attachments/assets/b02a7d19-0722-4138-ac14-d68a276ea061)  
![image](https://github.com/user-attachments/assets/4e3ba729-1c98-4fec-bb96-68683079d5b6)  

## Задание 2  
### Работа с типами данных  
1. Создаю переменные:  
```js
var name = "Евгений";
var birthYear = 2005;
var isStudent = true;
```
2. Добавляю в script.js код:  
```js
let score = prompt("Введите ваш балл:");
if (score >= 90) {
 console.log("Отлично!");
} else if (score >= 70) {
 console.log("Хорошо");
} else {
 console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
 console.log(`Итерация: ${i}`);
}
```
3. Результат вывода в консоли:  
![image](https://github.com/user-attachments/assets/8a9fcd3b-dd68-41af-a844-a991cdec2a98)  
![image](https://github.com/user-attachments/assets/f8a1ba37-6263-4034-aabe-a2ef2185db5f)  
![image](https://github.com/user-attachments/assets/11ab0897-59ab-4f6f-8cb4-2e7ed5a9791d)  

## Задание 3  
### Контрольные вопросы  
1. Чем отличается var от let и const?  
var — переменная с функцией блочной области видимости, может быть переопределена и используется в старых версиях JavaScript.  
let — переменная с блочной областью видимости, может быть изменена, но не может быть повторно объявлена в одной области видимости.  
const — переменная с блочной областью видимости, значение которой нельзя изменить после инициализации.  

2. Что такое неявное преобразование типов в JavaScript?  
Неявное (автоматическое) преобразование типов происходит, когда JavaScript автоматически конвертирует один тип данных в другой, например:  
```js
console.log("5" + 2); // "52" (строка)
console.log("5" - 2); // 3 (число)
```

3. Как работает оператор == в сравнении с ===?  
== выполняет сравнение значений с приведением типов.  
=== выполняет строгое сравнение без приведения типов.  
