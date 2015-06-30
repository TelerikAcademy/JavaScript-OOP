/*  */
(function () {
// Object.preventExtensions returns the object being made non-extensible.
    var obj = {};
    var obj2 = Object.preventExtensions(obj);
    console.log(obj === obj2);

// Objects are extensible by default.
    var empty = {};
    console.log('is "empty" extensible: ' + Object.isExtensible(empty));

// ...but that can be changed.
    Object.preventExtensions(empty);
    console.log('is "empty" extensible: ' + Object.isExtensible(empty));

// Object.defineProperty throws when adding a new property to a non-extensible object.
    var nonExtensible = {removable: true};
    Object.preventExtensions(nonExtensible);
//Object.defineProperty(nonExtensible, 'new', { value: 8675309 }); // throws a TypeError

// In strict mode, attempting to add new properties to a non-extensible object throws a TypeError.
    function fail() {
        'use strict';
        nonExtensible.newProperty = 'FAIL'; // throws a TypeError
    }

//fail();

    console.log('is "nonExtensible" extensiblxe: ' + Object.isExtensible(nonExtensible));
}());

