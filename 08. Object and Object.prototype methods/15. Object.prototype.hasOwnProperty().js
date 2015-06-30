/* Object.prototype.hasOwnProperty() */
// Using hasOwnProperty to test for a property's existence
(function() {
    o = new Object();
    o.prop = 'exists';

    function changeO() {
        o.newprop = o.prop;
        delete o.prop;
    }

    console.log('"o" has property "prop": ' + o.hasOwnProperty('prop'));   // returns true
    changeO();
    console.log('"o" has property "prop": ' + o.hasOwnProperty('prop'));   // returns false
}());

// Direct versus inherited properties
(function() {
    var o = new Object();
    o.prop = 'exists';
    console.log('"o" has property "prop": ' + o.hasOwnProperty('prop'));             // returns true
    console.log('"o" has property "toString": ' + o.hasOwnProperty('toString'));         // returns false
    console.log('"o" has property "hasOwnProperty": ' + o.hasOwnProperty('hasOwnProperty'));   // returns false
}());

// Iterating over the properties of an object
(function() {
    var buz = {
        fog: 'stack'
    };

    for (var name in buz) {
        if (buz.hasOwnProperty(name)) {
            console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]);
        }
        else {
            console.log(name); // toString or something else
        }
    }
}());

// hasOwnProperty as a property
(function() {
    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    console.log('"foo" has property "bar": ' + foo.hasOwnProperty('bar')); // always returns false

// Use another Object's hasOwnProperty and call it with 'this' set to foo
    console.log('"foo" has property "bar": ' + ({}).hasOwnProperty.call(foo, 'bar')); // true

// It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
    console.log('"foo" has property "bar": ' + Object.prototype.hasOwnProperty.call(foo, 'bar')); // true
}());