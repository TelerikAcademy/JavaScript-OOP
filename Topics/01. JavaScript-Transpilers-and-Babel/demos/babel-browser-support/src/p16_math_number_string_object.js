(function () {
    "use strict";

    console.log("##Math Number String Object APIs");

    console.log(Number.EPSILON);

    console.log(Number.isInteger(Infinity));

    console.log(Number.isNaN("NaN"));

    console.log(Math.acosh(3));
    console.log(Math.hypot(3, 4));
    console.log(Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2));
    console.log("abcde".includes("cd"));
    console.log("abc".repeat(3));

    Array.from(document.querySelectorAll("*")) // Returns a real Array
    Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior


})();
