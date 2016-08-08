// array matching
var list = [ 1, 2, 3, 4, 5, 6 ];
var [ a, b, ...c ] = list;
//[ b, a ] = [ a, b ];

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);

// Object matching
var { fname, age, lname } = {
    fname: 'John',
    lname:'Doe',
    age: 32
};

console.log(`first name: ${fname}`);
console.log(`age: ${age}`);

// Deep object matching
var { fname, age, lname, address: {city} } = {
    fname: 'John',
    lname:'Doe',
    age: 32,
    address: { city: 'Sofia' }
};

console.log(`first name: ${fname}`);
console.log(`city: ${city}`);

// parameter context matching
function f ([ name, val ]) {
    console.log(name, val)
}
function g ({ name: n, val: v }) {
    console.log(n, v)
}
function h ({ name, val }) {
    console.log(name, val)
}
f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })

// fail-soft destruction
var list = [ 7, 42 ]
var [ a = 1, b = 2, c = 3, d ] = list
console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`c = ${c}`);
console.log(`d = ${d}`);
