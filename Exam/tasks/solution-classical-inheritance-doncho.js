function solve() {
    var Item,
        Book,
        Media,
        Catalog,
        BookCatalog,
        MediaCatalog,
        validator,
        idGeneratorFactory;

    idGeneratorFactory = {
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

    validator = (function () {
        var CONSTS = {
            ID: {
                MIN: 0.00000,
                MAX: Infinity
            },
            NAME: {
                MIN: 2,
                MAX: 40
            },
            DESCRIPTION: {
                MIN: 1,
                MAX: Infinity
            },
            GENRE: {
                MIN: 2,
                MAX: 20
            },
            RATING: {
                MIN: 1,
                MAX: 5
            },
            DURATION: {
                MIN: 0.00001,
                MAX: Infinity
            },
            PATTERN: {
                MIN: 1,
                MAX: Infinity
            },
            COUNT: {
                MIN: 1,
                MAX: Infinity
            }
        };

        function validateString(str, min, max) {
            if (typeof (str) !== 'string' ||
                str.length < min ||
                str.length > max) {
                throw new Error('The string must have between ' + min + ' and ' + max + ' characters');
            }
        }

        function validateNumber(n, min, max) {
            if (typeof (n) !== 'number' ||
                n < min ||
                n > max) {
                throw new Error('The number must be between ' + min + ' and ' + max);
            }
        }

        function isNotChar(ch) {
            return isNaN(+ch);
        }

        return {
            validateId: function (id) {
                validateNumber(id, CONSTS.ID.MIN, CONSTS.ID.MAX);
            },
            validateName: function (name) {
                validateString(name, CONSTS.NAME.MIN, CONSTS.NAME.MAX);
            },
            validateISBN: function (isbn) {
                var isString = typeof (isbn) === 'string';
                var hasCorrectLength = isbn.length === 10 || isbn.length === 13;
                var hasNotOnlyDigits = isbn.split('').some(isNotChar);
                if (!isString || !hasCorrectLength || hasNotOnlyDigits) {
                    throw new Error('The ISBN must contain exactly 10 or 13 digits');
                }
            },
            validateDescription: function (description) {
                validateString(description, CONSTS.DESCRIPTION.MIN, CONSTS.DESCRIPTION.MAX);
            },
            validateRating: function (rating) {
                validateNumber(rating, CONSTS.RATING.MIN, CONSTS.RATING.MAX);
            },
            validateDuration: function (duration) {
                validateNumber(duration, CONSTS.DURATION.MIN, CONSTS.DURATION.MAX);
            },
            validateGenre: function (genre) {
                validateString(genre, CONSTS.GENRE.MIN, CONSTS.GENRE.MAX);
            },
            validatePattern: function (pattern) {
                validateString(pattern, CONSTS.PATTERN.MIN, CONSTS.PATTERN.MAX);
            },
            validateCount: function (count) {
                validateNumber(count, CONSTS.COUNT.MIN, CONSTS.COUNT.MAX);
            }
        };
    }());

    Item = (function (Parent) {
        var             idGenerator;
        idGenerator = idGeneratorFactory.get();

        function Item(name, description) {
            this.id = idGenerator.getNext();
            this.name = name;
            this.description = description;
        }
        Item.prototype = Object.create(Parent.prototype);
        Object.defineProperty(Item.prototype, 'name', {
            get: function () {
                return this._name;
            },
            set: function (name) {
                validator.validateName(name);
                this._name = name;
            }
        });

        Object.defineProperty(Item.prototype, 'description', {
            get: function () {
                return this._description;
            },
            set: function (description) {
                validator.validateDescription(description);
                this._description = description;
            }
        });

        return Item;
    }(function () {}));

    Book = (function (Parent) {
        function Book(name, isbn, genre, description) {
            Parent.call(this, name, description);
            this.isbn = isbn;
            this.genre = genre;
        }
        Book.prototype = Object.create(Parent.prototype);
        Object.defineProperty(Book.prototype, 'isbn', {
            get: function () {
                return this._isbn;
            },
            set: function (isbn) {
                validator.validateISBN(isbn);
                this._isbn = isbn;
            }
        });

        Object.defineProperty(Book.prototype, 'genre', {
            get: function () {
                return this._genre;
            },
            set: function (genre) {
                validator.validateGenre(genre);
                this._genre = genre;
            }
        });
        return Book;
    }(Item));

    Media = (function (Parent) {
        function Media(name, rating, duration, description) {
            Parent.call(this, name, description);
            this.rating = rating;
            this.duration = duration;
        }

        Object.defineProperty(Media.prototype, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (rating) {
                validator.validateRating(rating);
                this._rating = rating;
            }
        });
        Object.defineProperty(Media.prototype, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                validator.validateDuration(duration);
                this._duration = duration;
            }
        });

        return Media;
    }(Item));

    Catalog = (function () {
        var idGenerator = idGeneratorFactory.get();

        function Catalog(name) {
            this.id = idGenerator.getNext();
            this.name = name;
            this.items = [];
        }

        Object.defineProperty(Catalog.prototype, 'name', {
            get: function () {
                return this._name;
            },
            set: function (name) {
                validator.validateName(name);
                this._name = name;
            }
        });

        Catalog.prototype._validateItem = function (item) {
            validator.validateId(item.id);
            validator.validateName(item.name);
            validator.validateDescription(item.description);
        };

        Catalog.prototype.add = function (item) {
            if (typeof (item) === 'undefined') {
                throw new Error('undefined cannot be added to a catalog');
            }

            if (typeof (item.length) !== 'undefined') {
                return this.add.apply(this, item);
            }
            var itemsToAdd = [],
                items = [].slice.call(arguments, 0),
                that = this;
            items.forEach(function (item) {
                that._validateItem(item);
                itemsToAdd.push(item);
            });
            [].push.apply(this.items, itemsToAdd);
            return this;
        };

        Catalog.prototype.find = function (options) {
            if (typeof (options) === 'undefined') {
                throw new Error('Id must be ea number');
            }
            var isOnlyId = false,
                result;
            if (typeof (options) === 'number') {
                options = {
                    id: options
                };
                isOnlyId = true;
            }
            result = this.items.filter(function (item) {
                return Object.keys(options)
                    .every(function (key) {
                        return options[key] === item[key];
                    });
            });
            if (isOnlyId) {
                if (result.length) {
                    return result[0];
                }
                return null;
            }
            return result;
        };

        Catalog.prototype.search = function (pattern) {
            validator.validatePattern(pattern);
            pattern = pattern.toLowerCase();
            return this.items.filter(function (item) {
                return item.name.toLowerCase().indexOf(pattern) >= 0 ||
                    item.description.toLowerCase().indexOf(pattern) >= 0;
            });
        };

        return Catalog;
    }());

    BookCatalog = (function (Parent) {
        function BookCatalog(name){
            Parent.call(this, name);
        }

        BookCatalog.prototype._validateItem = function (book) {
            Parent.prototype._validateItem.call(this, book);
            validator.validateGenre(book.genre);
            validator.validateISBN(book.isbn);
        };

        BookCatalog.prototype.getGenres = function () {
            var genres = {};
            this.items.forEach(function (item) {
                genres[item.genre.toLowerCase()] = 1;
            });
            return Object.keys(genres);
        };

        return BookCatalog;
    }(Catalog));

    MediaCatalog = (function (Parent) {
        function MediaCatalog(name){
            Parent.call(this, name);
        }

        MediaCatalog.prototype._isValidItem = function (media) {
            return parent._isValidItem.call(this, media) &&
                validator.validateDuration(media.rating) &&
                validator.validateRating(media.duration);
        };

        MediaCatalog.prototype.getTop = function (count) {
            validator.validateCount(count);
            var items = this.items.slice();
            items.sort(function (i1, i2) {
                return i2.rating - i1.rating;
            });

            return items.slice(0, count)
                .map(function (item) {
                    return {
                        id: item.id,
                        name: item.name
                    };
                });
        };

        MediaCatalog.prototype.getSortedByDuration = function () {
            var itemsToReturn = this.items.slice();
            itemsToReturn.sort(function (i1, i2) {
                if (i1.duration === i2.duration) {
                    return i1.id - i2.id;
                }
                return i2.duration - i1.duration;
            });
        };

        return MediaCatalog;
    }(Catalog));

    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        }
    };
}

module.exports = solve;