/* Object.freeze() */
(function() {
    var o, obj = {
        prop: function() {},
        foo: 'bar'
    };

// New properties may be added, existing properties may be changed or removed
    obj.foo = 'baz';
    obj.lumpy = 'woof';
    delete obj.prop;

    o = Object.freeze(obj);
    console.log(Object.isFrozen(obj) === true);

// Now any changes will fail
    obj.foo = 'quux'; // silently does nothing
    obj.quaxxor = 'the friendly duck'; // silently doesn't add the property

// ...and in strict mode such attempts will throw TypeErrors
    function fail(){
        'use strict';
        obj.foo = 'sparky'; // throws a TypeError
        delete obj.quaxxor; // throws a TypeError
        obj.sparky = 'arf'; // throws a TypeError
    }

    fail();

// Attempted changes through Object.defineProperty will also throw
    Object.defineProperty(obj, 'ohai', { value: 17 }); // throws a TypeError
    Object.defineProperty(obj, 'foo', { value: 'eit' }); // throws a TypeError
}());