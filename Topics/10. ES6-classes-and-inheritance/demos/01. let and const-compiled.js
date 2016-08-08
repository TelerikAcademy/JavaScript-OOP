"use strict";

(function f() {
    {
        var x = undefined;
        {
            // okay, block scoped name
            var _x = "sneaky";
            console.log(_x);
            // error, const
            //x = "foo";
        }
        // error, already declared in block
        //let x = "inner";
    }
})();

//# sourceMappingURL=01. let and const-compiled.js.map