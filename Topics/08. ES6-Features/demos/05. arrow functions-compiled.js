'use strict';

var evens = [2, 3, 5, 6, 1, 3];

// Expression bodies
var odds = evens.map(function (v) {
    return v + 1;
});
var nums = evens.map(function (v, i) {
    return v + i;
});

// Statement bodies
var fives = [];
nums.forEach(function (v) {
    if (v % 5 === 0) {
        fives.push(v);
    }
});
console.log(fives);

// Lexical this
var bob = {
    _name: 'Bob',
    _friends: ['Rob', 'Steve', 'John'],
    printFriends: function printFriends() {
        var _this = this;

        this._friends.forEach(function (f) {
            return console.log(_this._name + ' knows ' + f);
        });
    }
};

//# sourceMappingURL=05. arrow functions-compiled.js.map