(function () {
    "use strict";
    console.log("##For");
    

    var array = ['a', 'b', 'c'];

    for (let i in array) console.log(i);  // prints "0", "1", "2"
    for (let i of array) console.log(i); // prints "a", "b", "c"



})();


