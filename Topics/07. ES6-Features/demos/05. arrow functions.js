
var evens = [2, 3, 5, 6, 1, 3];

// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
var fives = [];
nums.forEach(v => {
    if (v % 5 === 0)
    {
        fives.push(v);
    }
});
console.log(fives);

// Lexical this
var bob = {
    _name: 'Bob',
    _friends: ['Rob', 'Steve', 'John'],
    printFriends() {
        this._friends.forEach(f =>
        console.log(this._name + ' knows ' + f));
    }
}