var Person = Object.create(Object.prototype, {
  init: {
    value: function (name, age) {
      this.name = name;
      this.age = age;
      return this;
    }
  },
  name: {
    get: function () {
      return this._name;с
    },
    set: function (name) {
      this._name = name;
      return this;
    },
    enumerable: true
  }
});

var people = [
  Object.create(Person)
    .init('John Doe', 19),
  Object.create(Person)
    .init('Jane Doe', 21)
];

people.forEach(function (person) {
  console.log(person.name);
});