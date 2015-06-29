/* Object.is() */
(function() {
    console.log(Object.is('foo', 'foo'));     // true
    console.log(Object.is(window, window));   // true

    console.log(Object.is('foo', 'bar'));     // false
    console.log(Object.is([], []));           // false

    var test = {a: 1};
    console.log(Object.is(test, test));       // true

    console.log(console.log(Object.is(null, null))); // true

// Special Cases
    console.log(Object.is(0, -0));            // false
    console.log(Object.is(-0, -0));           // true
    console.log(Object.is(NaN, 0 / 0));         // true
}());