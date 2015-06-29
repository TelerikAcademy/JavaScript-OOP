/* Object.prototype.propertyIsEnumerable() */
// A basic use of propertyIsEnumerable
(function() {
    var o = {};
    var a = [];
    o.prop = 'is enumerable';
    a[0] = 'is enumerable';

    console.log('is "prop" enumerable: ' + o.propertyIsEnumerable('prop'));   // returns true
    console.log('is "0" enumerable: ' + a.propertyIsEnumerable(0));        // returns true
}());

// User-defined versus built-in objects
(function() {
    var a = ['is enumerable'];

    console.log('is "0" enumerable: ' + a.propertyIsEnumerable(0));          // returns true
    console.log('is "length" enumerable: ' + a.propertyIsEnumerable('length'));   // returns false

    console.log('is "Math.random" enumerable: ' + Math.propertyIsEnumerable('random'));   // returns false
    console.log('is "this.Math" enumerable: ' + this.propertyIsEnumerable('Math'));     // returns false
}());

// Direct versus inherited properties
(function() {
    var a = [];
    console.log('is "[].constructor" enumerable: ' + a.propertyIsEnumerable('constructor'));         // returns false

    function FirstConstructor() {
        this.property = 'is not enumerable';
    }

    FirstConstructor.prototype.firstMethod = function() {};

    function SecondConstructor() {
        this.method = function method() { return 'is enumerable'; };
    }

    SecondConstructor.prototype = new FirstConstructor;
    SecondConstructor.prototype.constructor = SecondConstructor;

    var o = new SecondConstructor();
    o.arbitraryProperty = 'is enumerable';

    console.log('is "o.arbitraryProo.perty" enumerable: ' + o.propertyIsEnumerable('arbitraryProperty'));   // returns true
    console.log('is "o.method" enumerable: ' + o.propertyIsEnumerable('method'));              // returns true
    console.log('is "o.property" enumerable: ' + o.propertyIsEnumerable('property'));            // returns false

    o.property = 'is enumerable';

    console.log('is "o.property" enumerable: ' + o.propertyIsEnumerable('property'));            // returns true

// These return false as they are on the prototype which
// propertyIsEnumerable does not consider (even though the last two are iteratable with for-in)
    console.log('is "o.prototype" enumerable: ' + o.propertyIsEnumerable('prototype'));   // returns false (as of JS 1.8.1/FF3.6)
    console.log('is "o.constructor" enumerable: ' + o.propertyIsEnumerable('constructor')); // returns false
    console.log('is "o.firstMethod" enumerable: ' + o.propertyIsEnumerable('firstMethod')); // returns false
}());