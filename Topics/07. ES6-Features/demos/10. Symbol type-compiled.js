"use strict";

Symbol("foo") !== Symbol("foo");
var foo = Symbol();
var bar = Symbol();
typeof foo === "symbol";
typeof bar === "symbol";
var obj = {};
obj[foo] = "foo";
obj[bar] = "bar";
JSON.stringify(obj); // {}
Object.keys(obj); // []
Object.getOwnPropertyNames(obj); // []
Object.getOwnPropertySymbols(obj); // [ foo, bar ]

//# sourceMappingURL=10. Symbol type-compiled.js.map