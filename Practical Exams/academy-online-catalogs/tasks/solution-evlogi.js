function solve() { // start 11:30
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!Object.keys) {
        Object.keys = (function () {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    var catalogue, bookCatalogue, mediaCatalogue,
        item, book, media,
        CONSTS = {
            NAME: {
                MIN: 2,
                MAX: 40
            },
            DESCRIPTION: {
                MIN: 1,
                MAX: 100000000
            },
            GENRE: {
                MIN: 2,
                MAX: 20
            },
            DURATION: {
                MIN: 0,
                MAX: 100000000
            }
        },
        validate = {
            isString: function (value, msg) {
                msg = msg || ' non-existent or not a string';
                if (!value || typeof value !== 'string') {
                    throw Error(value + msg);
                }
            },
            isNumber: function (value, msg) {
                msg = msg || ' non-existent or not a number';
                if ((!value && value !== 0) || typeof value !== 'number') {
                    throw Error(value + msg);
                }
            },
            isItem: function (value) {
                return Object.keys(item)
                    .every(function (key) {
                        return (typeof value[key] !== 'undefined');
                    });
            },
            isBook: function (value) {
                var isBook = this.isItem(value) && Object.keys(book)
                        .every(function (key) {
                            return (typeof value[key] !== 'undefined');
                        });
                return isBook;
            },
            isMedia: function (value) {
                var isMedia = this.isItem(value) && Object.keys(media)
                        .every(function (key) {
                            return (typeof value[key] !== 'undefined');
                        });
                return isMedia;
            },
            stringLength: function (value, min, max, msg) {
                msg = msg || 'Invalid string length';
                this.isString(value);
                if (value.length < min || value.length > max) {
                    throw Error(msg);
                }
            },
            ISBN: function (value, msg) {
                msg = msg || 'Invalid ISBN length';
                //value = value.replace(/-/g, '');
                this.isString(value);
                if (value.length !== 10 && value.length !== 13) {
                    throw Error(msg);
                }
            },
            numberRange: function (value, min, max, msg) {
                msg = msg || ' not in range';
                this.isNumber(value);

                if (value < min || value > max) {
                    throw Error(value + msg + '[' + min + '..' + max + ']');
                }
            }
        },
        idGenerator = {
            get: function () {
                return (function () {
                    var lastId = 0;
                    return {
                        getNext: function () {
                            return lastId += 1;
                        }
                    };
                }());
            }
        };

    item = (function (parent) {
        var closure = Object.create(parent),
            idGen = idGenerator.get();

        Object.defineProperty(closure, 'init', {
            value: function (name, description) {
                this._id = idGen.getNext();
                this.name = name;
                this.description = description;
                return this;
            }
        });
        Object.defineProperty(closure, 'id', {
            enumerable: true,
            get: function () {
                return this._id;
            }
        });
        Object.defineProperty(closure, 'name', {
            enumerable: true,
            get: function () {
                return this._name;
            },
            set: function (value) {
                validate.isString(value);
                validate.stringLength(value, CONSTS.NAME.MIN, CONSTS.NAME.MAX);
                this._name = value;
            }
        });
        Object.defineProperty(closure, 'description', {
            enumerable: true,
            get: function () {
                return this._description;
            },
            set: function (value) {
                validate.isString(value);
                validate.stringLength(value, CONSTS.DESCRIPTION.MIN, CONSTS.DESCRIPTION.MAX);
                this._description = value;
            }
        });

        return closure;
    }({}));

    book = (function (parent) {
        var closure = Object.create(parent);

        Object.defineProperty(closure, 'init', {
            value: function (name, description, isbn, genre) {
                parent.init.call(this, name, description);
                this.isbn = isbn;
                this.genre = genre;
                return this;
            }
        });
        Object.defineProperty(closure, 'isbn', {
            enumerable: true,
            get: function () {
                return this._isbn;
            },
            set: function (value) {
                validate.ISBN(value);
                this._isbn = value;
            }
        });
        Object.defineProperty(closure, 'genre', {
            enumerable: true,
            get: function () {
                return this._genre;
            },
            set: function (value) {
                validate.stringLength(value, CONSTS.GENRE.MIN, CONSTS.GENRE.MAX);
                this._genre = value;
            }
        });

        return closure;
    }(item));

    media = (function (parent) {
        var closure = Object.create(parent);

        Object.defineProperty(closure, 'init', {
            value: function (name, description, duration, rating) {
                parent.init.call(this, name, description);
                this.duration = duration;
                this.rating = rating;
                return this;
            }
        });
        Object.defineProperty(closure, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (value) {
                value = +value;
                validate.numberRange(value, 1, Infinity);
                this._duration = value;
            }
        });
        Object.defineProperty(closure, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (value) {
                value = +value;
                validate.numberRange(value, 1, 5);
                this._rating = value;
            }
        });

        return closure;
    }(item));

    catalogue = (function (parent) {
        var closure = Object.create(parent),
            idGen = idGenerator.get();

        Object.defineProperty(closure, 'init', {
            value: function (name) {
                this._id = idGen.getNext();
                this.name = name;
                this.items = [];
                return this;
            }
        });
        Object.defineProperty(closure, 'id', {
            get: function () {
                return this._id;
            }
        });
        Object.defineProperty(closure, 'name', {
            get: function () {
                return this._name;
            },
            set: function (value) {
                validate.isString(value);
                validate.stringLength(value, CONSTS.NAME.MIN, CONSTS.NAME.MAX);
                this._name = value;
            }
        });
        Object.defineProperty(closure, 'add', {
            value: function (items) {
                if (!arguments || !items) {
                    throw Error('must pass parameters or array');
                }

                var current, arr = arguments[0];
                if (!Array.isArray(arr)) {
                    arr = arguments;
                }

                for (i = 0, len = arr.length; i < len; i += 1) {
                    current = arr[i];
                    this.items.push(current);
                }
                return this;
            }
        });
        Object.defineProperty(closure, 'find', {
            value: function (params) {
                if (typeof params === 'object') {
                    return this.items.filter(function (item) {
                        return Object.keys(params)
                            .every(function (key) {
                                return item[key] === params[key];
                            })
                    });
                } else {
                    validate.isNumber(params);
                    var foundItem = this.items.find(function (item) {
                        return item.id === params;
                    });
                    return foundItem || null;
                }
            }
        });
        Object.defineProperty(closure, 'search', {
            value: function (pattern) {
                if (!pattern) {
                    throw Error('search patternt is not defined');
                }

                return this.items.filter(function (item) {
                    return item.name.indexOf(pattern) >= 0 ||
                        item.description.indexOf(pattern) >= 0;
                });
            }
        });

        return closure;
    }({}));

    bookCatalogue = (function (parent) {
        var closure = Object.create(parent);

        Object.defineProperty(closure, 'init', {
            value: function (name) {
                parent.init.call(this, name);
                return this;
            }
        });
        Object.defineProperty(closure, 'add', {
            value: function () {
                var i, arr = arguments;

                if (arguments[0] && arguments[0].length) {
                    arr = arguments[0];
                }

                for (i in arr) {
                    if (typeof arr[i] !== 'function' && !validate.isBook(arr[i])) {
                        throw Error('cannot add non-book item');
                    }
                }

                parent.add.apply(this, arguments);
                return this;
            }
        });
        Object.defineProperty(closure, 'getGenres', {
            value: function () {
                var genre, result = {};
                this.items.map(function (item) {
                    genre = item.genre.toLowerCase();
                    if (!result[genre]) {
                        result[genre] = 0;
                    }

                    result[genre] += 1;
                });

                return Object.keys(result);
            }
        });

        return closure;
    }(catalogue));

    mediaCatalogue = (function (parent) {
        var closure = Object.create(parent);

        Object.defineProperty(closure, 'init', {
            value: function (name) {
                parent.init.call(this, name);
                return this;
            }
        });
        Object.defineProperty(closure, 'add', {
            value: function () {
                var i, arr = arguments;

                if (arguments[0] && arguments[0].length) {
                    arr = arguments[0];
                }

                for (i in arr) {
                    if (typeof arr[i] !== 'function' && !validate.isMedia(arr[i])) {
                        throw Error('cannot add non-media item');
                    }
                }

                parent.add.apply(this, arguments);
                return this;
            }
        });
        Object.defineProperty(closure, 'getTop', {
            value: function (count) {
                count = +count;
                if (!count || count < 1) {
                    throw Error();
                }

                return this.items.sort(function (a, b) {
                        return b.rating - a.rating;
                    })
                    .slice(0, count)
                    .map(function(item) {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    });
            }
        });
        Object.defineProperty(closure, 'getSortedByDuration', {
            value: function () {
                return this.items.sort(function(a,b) {
                    if (a.duration !== b.duration) {
                        return a.duration - b.duration;
                    } else {
                        return b.id - a.id;
                    }
                }).slice(0);
            }
        });

        return closure;
    }(catalogue));

    return {
        getBook: function (name, isbn, genre, description) {
            return Object.create(book).init(name, description, isbn, genre);
        },
        getMedia: function (name, rating, duration, description) {
            return Object.create(media).init(name, description, duration, rating);
        },
        getBookCatalog: function (name) {
            return Object.create(bookCatalogue).init(name);
        },
        getMediaCatalog: function (name) {
            return Object.create(mediaCatalogue).init(name);
        }
    };
}

module.exports = solve;