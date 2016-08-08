/*  */
(function () {
    var o, obj = {
        prop: function () {
        },
        foo: 'bar'
    };

// New properties may be added, existing properties may be changed or removed.
    obj.foo = 'baz';
    obj.lumpy = 'woof';
    delete obj.prop;

    o = Object.seal(obj);

    console.log(o === obj);
    console.log(Object.isSealed(obj) === true);

// Changing property values on a sealed object still works.
    obj.foo = 'quux';
    console.log('obj.foo = ' + obj.foo);

// But you can't convert data properties to accessors, or vice versa.
//Object.defineProperty(obj, 'foo', { get: function() { return 'g'; } }); // throws a TypeError

// Now any changes, other than to property values, will fail.
    obj.quaxxor = 'the friendly duck'; // silently doesn't add the property
    console.log('obj.quaxxor = ' + obj.quaxxor);

    delete obj.foo; // silently doesn't delete the property
    console.log('obj.foo = ' + obj.foo);

// ...and in strict mode such attempts will throw TypeErrors.
    function fail() {
        'use strict';
        delete obj.foo; // throws a TypeError
        obj.sparky = 'arf'; // throws a TypeError
    }
    fail();

// Attempted additions through Object.defineProperty will also throw.
    Object.defineProperty(obj, 'ohai', {value: 17}); // throws a TypeError
    Object.defineProperty(obj, 'foo', {value: 'eit'}); // changes existing property value
}());