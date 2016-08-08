/* Object.prototype.isPrototypeOf() */
(function () {
    // consider the following prototype chain
    function Fee() {
        // ...
    }

    function Fi() {
        // ...
    }
    Fi.prototype = new Fee();

    function Fo() {
        // ...
    }
    Fo.prototype = new Fi();

    function Fum() {
        // ...
    }
    Fum.prototype = new Fo();

    var fum = new Fum();

    if (Fi.prototype.isPrototypeOf(fum)) {
        console.log('do something safe');
    }
}());