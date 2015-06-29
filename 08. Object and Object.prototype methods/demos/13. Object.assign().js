/* Object.assign() */
// Polyfill
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

// Cloning an object
(function() {
    var obj = {a: 1},
        copy = Object.assign({}, obj);
    console.log(copy); // { a: 1 }
}());

// Merging objects
(function() {
    var obj,
        o1 = {a: 1},
        o2 = {b: 2},
        o3 = {c: 3};

    obj = Object.assign(o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
}());

// Inherit properties and non-enumerable properties cannot be copied
(function() {
    var obj, copy;
    obj = Object.create({ foo: 1 }, { // foo is an inherit property.
        bar: {
            value: 2  // bar is a non-enumerable property.
        },
        baz: {
            value: 3,
            enumerable: true  // baz is an own enumerable property.
        }
    });

    copy = Object.assign({}, obj);
    console.log(copy);
    console.log(obj);

    console.log('copy.bar = ' + copy.bar);
    console.log('obj.bar = ' + obj.bar);
}());