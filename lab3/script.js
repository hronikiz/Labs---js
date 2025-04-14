/**
 * Функция-конструктор, представляющая предмет.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета.
 * @param {string} rarity - Редкость предмета (может быть "common", "uncommon", "rare" или "legendary").
 */
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = weight;

    const validRarities = ["common", "uncommon", "rare", "legendary"];
    if (!validRarities.includes(rarity)) {
        this.rarity = "no such rarity";
    } else {
        this.rarity = rarity;
    }
}

/**
 * Получает информацию о предмете.
 * @returns {string} Строка с информацией о предмете.
 */
Item.prototype.getInfo = function() {
    return `name: ${this.name}\nweight: ${this.weight}\nrarity: ${this.rarity}\n`;
};

/**
 * Обновляет вес предмета.
 * @param {number} newWeight - Новый вес предмета.
 */
Item.prototype.setWeight = function(newWeight) {
    this.weight = newWeight;
};

/**
 * Функция-конструктор, представляющая оружие, наследующий от Item.
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес оружия.
 * @param {string} rarity - Редкость оружия.
 * @param {number} damage - Урон оружия.
 * @param {number} durability - Прочность оружия (от 0 до 100).
 */
function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity);  // Наследование от Item
    this.damage = damage;

    if (durability >= 0 && durability <= 100) {
        this.durability = durability;
    } else {
        this.durability = "no such durability";
    }
}

// Наследование прототипа Item
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

/**
 * Получает информацию об оружии.
 * @returns {string} Строка с описанием оружия.
 */
Weapon.prototype.getInfo = function() {
    return `${Item.prototype.getInfo.call(this)}damage: ${this.damage}\ndurability: ${this.durability}\n`;
};

/**
 * Использует оружие, снижая прочность на 10.
 */
Weapon.prototype.use = function() {
    if (this.durability > 0 && typeof this.durability === "number") {
        this.durability -= 10;
    }
};

/**
 * Ремонтирует оружие, восстанавливая прочность до 100.
 */
Weapon.prototype.repair = function() {
    if (typeof this.durability === "number") {
        this.durability = 100;
    }
};

const sword2 = new Item("Steel Sword", 3.5, "rare");
console.log(sword2.getInfo());
sword2.setWeight(4.0);
console.log(sword2.getInfo());

const bow2 = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow2.getInfo());
bow2.use();
console.log(bow2.durability);  
bow2.repair();
console.log(bow2.durability);  
