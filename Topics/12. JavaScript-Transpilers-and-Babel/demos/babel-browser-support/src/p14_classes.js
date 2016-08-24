(function () {
    "use strict";

    console.log("##Classes");

    class Cat {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(this.name + ' says meow.');
        }
    }

    class Lion extends Cat {
        speak() {
            super.speak();
            console.log(this.name + ' roars.');
        }
    }

    var cat = new Cat("pkitty");
    cat.speak();

    var lion = new Lion("Symba");
    lion.speak();



})();
