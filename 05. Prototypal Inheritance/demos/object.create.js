var person = (function () {
  var CONSTS = {
    NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30
    }
  };
  
  function validateName(name) {
    if (typeof (name) !== 'string' ||
      name.length < CONSTS.NAME.MIN_LENGTH ||
      name.length > CONSTS.NAME.MAX_LENGTH) {
      throw new Error(name + ' is not a valid name');
    }
  }

  var person = {
    init: function (firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
      return this;
    },
    get firstname() {
      return this._fname;
    },
    set firstname(val) {
      validateName(val);
      this._fname = val;
      return this;
    },
    get lastname() {
      return this._lname;
    },
    set lastname(val) {
      validateName(val);
      this._lname = val;
      return this;
    },
    get fullname() {
      return this.firstname + ' ' + this.lastname;
    },
    set fullname(val) {
      var names = val.split(' ');
      if (names.length !== 2) {
        throw new Error('Fullname must be in the format [FIRSTNAME LASTNAME]')
      }
      this.firstname = names[0];
      this.lastname = names[1];
      return this;
    },
    toString: function () {
      return '(Firstname: ' + this.firstname + ', Lastname: ' + this.lastname + ')';
    }
  };
  return person;
} ());

var people = [
  Object.create(person)
    .init('John', 'Doe'),
  Object.create(person)
    .init('Jane', 'Doe')
];

people.forEach(function (person) {
  console.log(person.toString());
});
