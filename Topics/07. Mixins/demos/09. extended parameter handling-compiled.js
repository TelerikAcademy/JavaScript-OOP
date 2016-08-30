// extended parameter values
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function f1(x) {
    var y = arguments[1] === undefined ? 7 : arguments[1];
    var z = arguments[2] === undefined ? 42 : arguments[2];

    return x + y + z;
}
console.log(f1(1)); // 50

// rest parameter
function f2(x, y) {
    for (var _len = arguments.length, a = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        a[_key - 2] = arguments[_key];
    }

    return (x + y) * a.length;
}
console.log(f2(1, 2, "hello", true, 7)); // 9

// spread operator
var params = ["hello", true, 7];
var other = [1, 2].concat(params); // [ 1, 2, "hello", true, 7 ]
console.log(f2.apply(undefined, [1, 2].concat(params))); // 9

var str = "foo";
var chars = [].concat(_toConsumableArray(str)); // [ "f", "o", "o" ]
console.log(chars);

//# sourceMappingURL=09. extended parameter handling-compiled.js.map