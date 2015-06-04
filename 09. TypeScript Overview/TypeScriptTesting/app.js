var currentName;
var hasPassed;
var averageMark;
var currentCourses;
var additionalInfo;
var currentState;

var State;
(function (State) {
    State[State["Onsight"] = 0] = "Onsight";
    State[State["Online"] = 1] = "Online";
    State[State["NotEnrolled"] = 2] = "NotEnrolled";
})(State || (State = {}));

function setStudent(name, passed, mark, courses, info, state) {
    currentName = name;
    hasPassed = passed;
    averageMark = mark;
    currentCourses = courses;
    additionalInfo = info;
    currentState = state;
}

setStudent('Ivaylo', true, 3, ['JS OOP', 'JS DOM'], function () {
}, 0 /* Onsight */);

function calculateSum(x, y, z) {
    var restNumbers = [];
    for (var _i = 0; _i < (arguments.length - 3); _i++) {
        restNumbers[_i] = arguments[_i + 3];
    }
    var sum = x + y;
    for (var i = 0; i < restNumbers.length; i++) {
        sum += restNumbers[i];
    }
    return sum;
}

var calculate = calculateSum;

var calcSum = function (x, y) {
    return x + y;
};

function sum(x, y) {
    if (typeof x == "string") {
        x = parseInt(x);
        y = parseInt(y);
    }
    return x + y;
}
//# sourceMappingURL=app.js.map
