var ValidationMixin = Base => class extends Base {
    _validateString(str) {
        return str && (typeof str === "string") && str.length > 0;
    }

    _validateNumber(n) {
        return n && (typeof n === "number");
    }
};

class Person extends ValidationMixin(Object) {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }

    introduce() {
        console.log(`Hi! My name is ${this.name} and I am ${this.age}-years-old!`);
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!this._validateString(name)) {
            throw new Error("Invalid name");
        }
        this._name = name;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (!this._validateNumber(age)) {
            throw new Error("Invalid age");
        }
        this._age = age;
    }
}

let p = new Person("John", 1);

console.log(p instanceof Person);

p.introduce();

