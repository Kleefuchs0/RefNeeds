

class Item {
    name = ""
    extras = []
    value = 1
    constructor(name, extras, value) {
        this.name = name;
        this.extras = extras;
        this.value = value;
    }
}

const _defaultExtrasFood = ["Ketchup", "Senf", "Mayo", "Zwiebeln"];

const items = {
    foods: [
        new Item("Wurst (Weiß) im Brötchen", _defaultExtrasFood, 1),
        new Item("Wurst (Rot) im Brötchen", _defaultExtrasFood, 1),
        new Item("Schweinesteak im Brötchen", _defaultExtrasFood, 1),
        new Item("Putensteak im Brötchen", _defaultExtrasFood, 1),
        new Item("Pommes", ["Ketchup", "Senf", "Mayo"], 1)
    ],
    beverages: [
        new Item("Wasser", [], 1),
        new Item("Apfelschorle", [], 1.5),
        new Item("Fanta", [], 2),
        new Item("Coca-Cola", [], 2)
    ]
}
