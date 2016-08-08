/*  */
(function() {
// Objects aren't sealed by default.
    var empty = {};
    console.log('is "empty" sealed: ' + Object.isSealed(empty));

// If you make an empty object non-extensible, it is vacuously sealed.
    Object.preventExtensions(empty);
    console.log('is "empty" sealed: ' + Object.isSealed(empty));

// The same is not true of a non-empty object, unless its properties are all non-configurable.
    var hasProp = {fee: 'fie foe fum'};
    Object.preventExtensions(hasProp);
    console.log('is "hasProp" sealed: ' + Object.isSealed(hasProp));

// But make them all non-configurable and the object becomes sealed.
    Object.defineProperty(hasProp, 'fee', {configurable: false});
    console.log('is "hasProp" sealed: ' + Object.isSealed(hasProp));

// The easiest way to seal an object, of course, is Object.seal.
    var sealed = {};
    Object.seal(sealed);
    console.log('is "sealed" sealed: ' + Object.isSealed(sealed));

// A sealed object is, by definition, non-extensible.
    console.log('is "sealed" extensible: ' + Object.isExtensible(sealed));

// A sealed object might be frozen, but it doesn't have to be.
    console.log('is "sealed" frozen: ' + Object.isFrozen(sealed)); // all properties also non-writable

    var s2 = Object.seal({p: 3});
    console.log('is "s2" frozen: ' + Object.isFrozen(s2)); // 'p' is still writable

    var s3 = Object.seal({
        get p() {
            return 0;
        }
    });
    // only configurability matters for accessor properties
    console.log('is "sealed" frozen: ' + Object.isFrozen(s3));
}());