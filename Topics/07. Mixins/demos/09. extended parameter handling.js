// extended parameter values
function f1 (x, y = 7, z = 42) {
    return x + y + z
}
console.log(f1(1)); // 50

// rest parameter
function f2 (x, y, ...a) {
    return (x + y) * a.length;
}
console.log(f2(1, 2, "hello", true, 7)); // 9

// spread operator
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]
console.log(f2(1, 2, ...params)); // 9

var str = "foo"
var chars = [ … str ] // [ "f", "o", "o" ]
console.log(chars);