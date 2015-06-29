/* Object.prototype.valueOf() */
(function () {
    var o = new Object(),
        myVar = o.valueOf();

    console.log('' + myVar); // [object Object]
}());