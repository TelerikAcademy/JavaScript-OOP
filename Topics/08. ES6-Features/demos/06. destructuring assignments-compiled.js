// array matching
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var list = [1, 2, 3, 4, 5, 6];
var a = list[0];
var b = list[1];
var c = list.slice(2);

//[ b, a ] = [ a, b ];

console.log('a = ' + a);
console.log('b = ' + b);
console.log('c = ' + c);

// Object matching
var _fname$lname$age = {
    fname: 'John',
    lname: 'Doe',
    age: 32
};
var fname = _fname$lname$age.fname;
var age = _fname$lname$age.age;
var lname = _fname$lname$age.lname;

console.log('first name: ' + fname);
console.log('age: ' + age);

// Deep object matching
var _fname$lname$age$address = {
    fname: 'John',
    lname: 'Doe',
    age: 32,
    address: { city: 'Sofia' }
};
var fname = _fname$lname$age$address.fname;
var age = _fname$lname$age$address.age;
var lname = _fname$lname$age$address.lname;
var city = _fname$lname$age$address.address.city;

console.log('first name: ' + fname);
console.log('city: ' + city);

// parameter context matching
function f(_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var name = _ref2[0];
    var val = _ref2[1];

    console.log(name, val);
}
function g(_ref3) {
    var n = _ref3.name;
    var v = _ref3.val;

    console.log(n, v);
}
function h(_ref4) {
    var name = _ref4.name;
    var val = _ref4.val;

    console.log(name, val);
}
f(['bar', 42]);
g({ name: 'foo', val: 7 });
h({ name: 'bar', val: 42 });

// fail-soft destruction
var list = [7, 42];
var _list$0 = list[0];
var a = _list$0 === undefined ? 1 : _list$0;
var _list$1 = list[1];
var b = _list$1 === undefined ? 2 : _list$1;
var _list$2 = list[2];
var c = _list$2 === undefined ? 3 : _list$2;
var d = list[3];

console.log('a = ' + a);
console.log('b = ' + b);
console.log('c = ' + c);
console.log('d = ' + d);

//# sourceMappingURL=06. destructuring assignments-compiled.js.map