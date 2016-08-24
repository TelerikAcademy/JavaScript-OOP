(function () {
    "use strict";

    console.log("##Symbols");
    //limited support

    var sym = Symbol("foo");
    var obj = {[sym]: 1};
    console.log(obj[sym]);

})();
