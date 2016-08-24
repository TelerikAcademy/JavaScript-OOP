(function () {
    "use strict";
    
    console.log('##Strings');
    
    
    // multi-line string
    var a=`hello
    world`;
    console.log(a);
    console.log(typeof a);

    // string interpolation
    var name = 'Joe';
    var yearOfBirth = 1999;

    var greeting = `hello ${name}, you are ${2015 - yearOfBirth} years old`;
    console.log(greeting);
    console.log("John","Doe");

    //throw new Error("Custom Error, testing error handling");


})();
