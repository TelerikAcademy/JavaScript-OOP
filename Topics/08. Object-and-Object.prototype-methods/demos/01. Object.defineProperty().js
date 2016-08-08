/*  */
(function() {
// using __proto__
    var obj = {};
    Object.defineProperty(obj, 'key1', {
        __proto__: null, // no inherited properties
        value: 'static1'  // not enumerable
        // not configurable
        // not writable
        // as defaults
    });

// being explicit
    Object.defineProperty(obj, 'key2', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 'static2'
    });

// recycling same object
    function withValue(value) {
        var d = withValue.d || (
                withValue.d = {
                    enumerable: false,
                    writable: false,
                    configurable: false,
                    value: null
                }
            );
        d.value = value;
        return d;
    }

    Object.defineProperty(obj, 'key3', withValue('static3'));
}());