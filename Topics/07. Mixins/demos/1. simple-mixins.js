var hasPrintNameMixin = {
    printName() {
        console.log(`My name is ${this.name}`);
    }
};

class Person {
    constructor(name) {
        this.name = name;
    }
}

inheritMixin(Person, hasPrintNameMixin);

function inheritMixin(klass, mixin) {
    Object.keys(mixin)
        .forEach(key => klass.prototype[key] = mixin[key]);
}

let p = new Person("John");

p.printName();