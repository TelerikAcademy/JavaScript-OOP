/*  */
(function() {
// New objects are extensible.
    var empty = {};
    console.log('is "empty" extensible: ' + Object.isExtensible(empty));

// ...but that can be changed.
    Object.preventExtensions(empty);
    console.log('is "empty" extensible: ' + Object.isExtensible(empty));

// Sealed objects are by definition non-extensible.
    var sealed = Object.seal({});
    console.log('is "sealed" extensible: ' + Object.isExtensible(sealed));

// Frozen objects are also by definition non-extensible.
    var frozen = Object.freeze({});
    console.log('is "frozen" extensible: ' + Object.isExtensible(frozen));
}());
