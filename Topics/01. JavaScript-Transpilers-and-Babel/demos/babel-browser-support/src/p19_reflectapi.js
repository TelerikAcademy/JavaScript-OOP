
(function () {
    "use strict";

    console.log("##Reflect API");
    var O = {a: 1};
    Object.defineProperty(O, 'b', {value: 2});
    O[Symbol('c')] = 3;

    Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

    function C(a, b){
        this.c = a + b;
    }
    var instance = Reflect.construct(C, [20, 22]);
    console.log(instance.c); // 42

})();
