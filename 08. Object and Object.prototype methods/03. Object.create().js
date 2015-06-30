/* Classical inheritance with Object.create() */
(function () {
// Shape - superclass
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

// superclass method
    Shape.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        console.info('Shape moved.');
    };

// Rectangle - subclass
    function Rectangle() {
        Shape.call(this); // call super constructor.
    }

// subclass extends superclass
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
    console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
    rect.move(1, 1); // Outputs, 'Shape moved.'
}());

/* Using propertiesObject argument with Object.create() */
(function () {
    var o;
// create an object with null as prototype
    o = Object.create(null);

    o = {};
// is equivalent to:
    o = Object.create(Object.prototype);

// Example where we create an object with a couple of sample properties.
// (Note that the second parameter maps keys to *property descriptors*.)
    o = Object.create(Object.prototype, {
        // foo is a regular 'value property'
        foo: {
            writable: true,
            configurable: true,
            value: 'hello'
        },
        // bar is a getter-and-setter (accessor) property
        bar: {
            configurable: false,
            get: function () {
                return 10;
            },
            set: function (value) {
                console.log('Setting `o.bar` to', value);
            }
        }
    });

    function Constructor() {
    }

    o = new Constructor();
// is equivalent to:
    o = Object.create(Constructor.prototype);
// Of course, if there is actual initialization code in the
// Constructor function, the Object.create() cannot reflect it

// create a new object whose prototype is a new, empty object
// and adding single property 'p', with value 42
    o = Object.create({}, {p: {value: 42}});

// by default properties ARE NOT writable, enumerable or configurable:
    o.p = 24;
    console.log(o.p); // 42

    o.q = 12;
    for (var prop in o) {
        console.log(prop); // 'q'
    }

    delete o.p; // false
}());
/**/