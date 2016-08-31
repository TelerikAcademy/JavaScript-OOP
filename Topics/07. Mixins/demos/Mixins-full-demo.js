/* globals console */
// Classes
//  Mixins
//  Scopes & Closures

let db = (function() {
    let dataStorage = {};
    let lastId = 0;

    function getTypeName(obj) {
        let typeName = obj.constructor.name;
        if (typeName === "") {
            typeName = "anonymous";
        }
        return typeName;
    }

    let Saveable = Base => class extends Base {
        //rest
        constructor(...args) {
            super(...args);
            this.id = (lastId += 1);
        }

        save() {
            let typeName = getTypeName(this);

            if (!dataStorage[typeName]) {
                dataStorage[typeName] = [];
            }
            dataStorage[typeName].push(this);
        }

        static all() {
            let typeName = this.name;
            return dataStorage[typeName];
        }

        static findById(id) {
            let typeName = this.name;
            return (dataStorage[typeName]
                .find(obj => obj.id === id) || null);
        }
    };

    function list(Type) {
        //Type -> Person, Shape
        return dataStorage[Type.name];
    }

    //revealing module pattern
    return {
        Saveable,
        list
    };
}());

class Mammal {
    constructor(age) {
        this.age = age;
    }
}

class Person extends db.Saveable(Mammal) {
    constructor(name, age) {
        super(age);
        this.name = name;
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
}

let st = new Student("Jonhy", 11, 4);
st.save();
console.log(Student.all());

class Shape extends db.Saveable(Object) {}

let count = 5;
Array.from({ length: count })
    .map((_, i) => new Shape(`Person #${i}`, i + 1))
    .forEach(p => p.save());

let sh = new Shape();
sh.save();
let p = new Person("John", 111);
p.save();

console.log(Shape.all());

let p2 = Person.findById(6);
console.log(p2);