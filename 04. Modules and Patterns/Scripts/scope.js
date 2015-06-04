var globalVar = 5;

function outerFunction() {
    var privateVar = globalVar;

    function innerFunction() {
        var innerVar = privateVar;
    }

    innerFunction();
}

outerFunction();