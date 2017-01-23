/* globals console setTimeout document */

let a1 = [1, 2];
let a2 = Array.from({ length: 5 });
console.log(a2);

console.log(Array.of(4, 6, 7, 8));


//spread (...)

function sum(x, y, z) {
    return x + y + z;
}

let xyz = [1, 2, 3];
console.log(sum(...xyz));
console.log(xyz);
// xyz.push(4);
xyz = [0, ...xyz, 4];
console.log(xyz);