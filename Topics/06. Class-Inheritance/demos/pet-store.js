const petStore = (function () {

    class Animal {
        constructor(name, age, sound) {
            this.name = name;
            this.age = age;
            this.sound = sound;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if(typeof value !== 'string' || value.length < 2) {
                throw new Error('Name must be string value with at least 2 symbols!');
            }

            this._name = value;
        }

        get age() {
            return this._age;
        }

        set age(value) {
            if(value < 0) {
                throw new Error('Age cannot be negative number!');
            }

            this._age = value;
        }

        get sound() {
            return this._sound;
        }

        set sound(value) {
            if(typeof value !== 'string') {
                throw new Error('Sound must be string!');
            }

            this._sound = value;
        }

        makeSound() {
            console.log(this.sound);
        }

        toString() {
            return `${this.name} is ${this.age} years old`
        }
    }

    class Cat extends Animal {
        constructor(name, age, color) {
            super(name, age, 'mew');

            this.color = color;
        }

        toString() {
            return `${super.toString()} ${this.color} cat`;
        }
    }

    class MythicalDragonHydra extends Animal {
        constructor(name, age, headsCount) {
            super(name, age, 'RAWRWRWR');

            if(headsCount < 2) {
                throw new Error('MythicalDragonHydra must have at least 2 heads!');
            }

            this._headsCount = headsCount;
        }

        get headsCount() {
            return this._headsCount;
        }

        growHead() {
            this._headsCount += 1;
            this.makeSound();
        }

        toString() {
            return `${super.toString()} and is a mythic dragon hydra with ${this.headsCount} heads!`;
        }
    }

    return {
        getCat: function(name, age, color) {
            return new Cat(name, age, color);
        },
        getHydra: function(name, age, headsCount) {
            return new MythicalDragonHydra(name, age, headsCount);
        }
    };
} ());

const davinci = petStore.getCat('davinci', 2, 'gray'),
    petko = petStore.getHydra('petko', 1000, 5);

davinci.makeSound();
console.log(davinci.toString());

petko.makeSound();
console.log(petko.toString());