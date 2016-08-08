var animal = (function () {
  var animal = {};
  Object.defineProperty(animal, 'init', {
    value: function (name, age) {
      this.name = name;
      this.age = age;
      return this;
    }
  });
  Object.defineProperty(animal, 'toString', {
    value: function () {
      var self = this;
      return Object.keys(self)
        .reduce(function (result, prop) {
        return result + '(' + prop[0].toUpperCase() + prop.substr(1) + ': ' + self[prop] + ') ';
      }, '')
        .trim();
    }
  });
  return animal;
} ());

var dog = (function (parent) {
  var dog;

  dog = Object.create(parent);

  Object.defineProperty(dog, 'init', {
    value: function (name, age, breed) {
      parent.init.call(this, name, age);
      this.breed = breed;
      return this;
    }
  });

  Object.defineProperty(dog, 'toString', {
    value: function () {
      return parent.toString.call(this) + ' (Type: dog)';
    }
  });

  return dog;
} (animal));


var johny = Object.create(dog)
  .init('Johny', 13, 'husky');
console.log(johny.toString());