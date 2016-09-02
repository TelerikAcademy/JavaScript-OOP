/* globals console */

let HasPrintNameMixin = Base => class extends Base {
    printName() {
        console.log(`{Name: ${this.name}}`);
    }
};

var ValidationMixin = Base => class extends Base {
    _isStringValid(str, options = {}) {
        options.min = options.min || 0;
        options.max = options.max || Number.MAX_VALUE;

        return str && (typeof str === "string") && str.length > options.min && str.length < options.max;
    }
};

class Person extends ValidationMixin(HasPrintNameMixin(Object)) {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
    get name() {
        return this._name;
    }

    set name(name) {
        if (!this._isStringValid(name)) {
            throw new Error("Invalid name");
        }

        this._name = name;
    }
}

let p = new Person("John", 17);

p.printName();