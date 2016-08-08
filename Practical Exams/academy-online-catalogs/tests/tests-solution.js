/* globals require, describe, it */
var expect = require('chai').expect,
    result = require('../tasks/solution')();

/* beforeach: start */
var utils = (function () {
    var CONSTS = {
        NAME: {
            MIN: 2,
            MAX: 40
        },
        DESCRIPTION: {
            MIN: 1,
            MAX: 1000
        },
        ISBN10: {
            LENGTH: 10
        },
        ISBN13: {
            LENGTH: 13
        },
        GENRE: {
            MIN: 2,
            MAX: 20
        },
        DURATION: {
            MIN: 0,
            MAX: 10000
        },
        RATING: {
            MIN: 1,
            MAX: 5
        },
        CHARS: 'QWERTYUIOPASDFGHJKLZXCVBNM _.-?!,\'\":;',
        DIGIS: '0123456789'
    };

    function getRandom(min, max) {
        if (typeof (max) === 'undefined') {
            max = min;
            min = 0;
        }
        /* jshint ignore: start */
        return (Math.random() * (max - min) + min) | 0;
        /* jshint ignore: end */
    }

    function getRandomString(chars, length) {
        return Array.apply(null, {
            length: length
        }).map(function () {
            return chars[getRandom(chars.length)];
        }).join('');
    }

    var utils = {
        valid: {
            getName: function () {
                var length = getRandom(CONSTS.NAME.MIN, CONSTS.NAME.MAX);
                return getRandomString(CONSTS.CHARS, length);
            },
            getISBN10: function () {
                var length = 10;
                return getRandomString(CONSTS.DIGIS, length);
            },
            getISBN13: function () {
                var length = 13;
                return getRandomString(CONSTS.DIGIS, length);
            },
            getGenre: function () {
                var length = getRandom(CONSTS.GENRE.MIN, CONSTS.GENRE.MAX);
                return getRandomString(CONSTS.CHARS, length);
            },
            getDescription: function () {
                var length = getRandom(CONSTS.DESCRIPTION.MIN, CONSTS.DESCRIPTION.MAX);
                return getRandomString(CONSTS.CHARS, length);
            },
            getDuration: function () {
                return getRandom(0, 1000);
            },
            getRating: function () {
                return getRandom(1, 5);
            }
        },
        invalid: {
            getShorterName: function () {
                var length = getRandom(0, CONSTS.NAME.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerName: function () {
                var length = getRandom(CONSTS.NAME.MAX + 1, CONSTS.NAME.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            },
            getInvalidISBN10WithLetters: function () {
                var isbn = utils.valid.getISBN10().split(''),
                    index = getRandom(isbn.length);
                isbn.splice(index, 1, 'a');
                return isbn;
            },
            getInvalidISBN13WithLetters: function () {
                return utils.valid.getISBN13().substring(1);
            },
            getInvalidISBNNot10or13: function () {
                var isbn = utils.valid.getISBN13().split(''),
                    index = getRandom(isbn.length);
                isbn.splice(index, 1, 'a');
                return isbn;
            },
            getShorterDescription: function () {
                var length = getRandom(0, CONSTS.DESCRIPTION.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerDescription: function () {
                var length = getRandom(CONSTS.DESCRIPTION.MAX + 1, CONSTS.DESCRIPTION.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            },
            getShorterGenre: function () {
                var length = getRandom(0, CONSTS.GENRE.MIN - 1);
                return getRandomString(CONSTS.CHARS, length);
            },
            getLongerGenre: function () {
                var length = getRandom(CONSTS.GENRE.MAX + 1, CONSTS.GENRE.MAX * 2);
                return getRandomString(CONSTS.CHARS, length);
            },
            getSmallRating: function () {
                return 0;
            },
            getLargeRating: function () {
                return getRandom(6, 1000);
            }
        }
    };

    return utils;
}());
/* beforeach: end */

describe('Academy Catalogs', function () {
    describe('Book tests', function () {
        describe('Valid tests', function () {
            // test 1
            it('expect getBook to exist, to be a function and to return object with properties unique id, name, description, isbn and ganre', function () {
                var name,
                    isbn,
                    genre,
                    description,
                    book,
                    i,
                    ids,
                    count;

                expect(result.getBook).to.exist;
                expect(result.getBook).to.be.a('function');

                name = utils.valid.getName();
                isbn = utils.valid.getISBN10();
                genre = utils.valid.getGenre();
                description = utils.valid.getDescription();

                book = result.getBook(name, utils.valid.getISBN13(), genre, description);
                book = result.getBook(name, isbn, genre, description);
                expect(book).to.be.a('object');
                expect(book.name).to.be.a('string');
                expect(book.name).to.equal(name);

                expect(book.isbn).to.be.a('string');
                expect(book.isbn).to.equal(isbn);

                expect(book.genre).to.be.a('string');
                expect(book.genre).to.equal(genre);

                expect(book.description).to.be.a('string');
                expect(book.description).to.equal(description);

                expect(book.id).to.be.a('number');
                i = 0;
                count = 10000;
                ids = {};
                while (i !== count) {
                    book = result.getBook(name, isbn, genre, description);
                    expect(ids[book.id]).to.be.undefined;
                    ids[book.id] = 1;
                    i += 1;
                }
            });
        });
        describe('Invalid tests', function () {
            // test 2
            it('Expect invalid name to throw', function () {

                expect(result.getBook).to.exist;
                function testName_undefined() {
                    result.getBook(undefined, utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testNameSetter_undefined() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.name = undefined;
                }

                function testName_null() {
                    result.getBook(null, utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testNameSetter_null() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.name = null;
                }

                function testName_EmptyString() {
                    result.getBook('', utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testNameSetter_EmptyString() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.name = '';
                }

                function testName_Short() {
                    result.getBook(utils.invalid.getShorterName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testNameSetter_Short() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.name = utils.invalid.getShorterName();
                }

                function testName_Long() {
                    var name = utils.invalid.getLongerName();
                    var isbn10 = utils.valid.getISBN10();
                    var genre = utils.valid.getGenre();
                    var description = utils.valid.getDescription();
                    result.getBook(name, isbn10, genre, description);
                }

                function testNameSetter_Long() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.name = utils.invalid.getLongerName();
                }

                expect(result.getBook).to.exist;
                expect(testName_undefined).to.throw();
                expect(testNameSetter_undefined).to.throw();
                expect(testName_null).to.throw();
                expect(testNameSetter_null).to.throw();
                expect(testName_EmptyString).to.throw();
                expect(testNameSetter_EmptyString).to.throw();
                expect(testName_Short).to.throw();
                expect(testNameSetter_Short).to.throw();
                expect(testName_Long).to.throw();
                expect(testNameSetter_Long).to.throw();
            });
            // test 3
            it('Expect invalid isbn to throw', function () {
                function testISBN_undefined() {
                    result.getBook(utils.valid.getName(), undefined, utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_undefined() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = undefined;
                }

                function testISBN_null() {
                    result.getBook(utils.valid.getName(), null, utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_null() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = null;
                }

                function testISBN_EmptyString() {
                    result.getBook(utils.valid.getName(), '', utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_EmptyString() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = '';
                }

                function testISBN_10WithLetters() {
                    result.getBook(utils.valid.getName, utils.invalid.getInvalidISBN10WithLetters(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_10WithLetters() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = utils.invalid.getInvalidISBN10WithLetters();
                }

                function testISBN_13WithLetters() {
                    result.getBook(utils.valid.getName, utils.invalid.getInvalidISBN13WithLetters(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_13WithLetters() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN13(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = utils.invalid.getInvalidISBN13WithLetters();
                }

                function testISBN_not10or13() {
                    result.getBook(utils.valid.getName, utils.invalid.getInvalidISBNNot10or13(), utils.valid.getGenre(), utils.valid.getDescription());
                }

                function testISBNSetter_not10or13() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN13(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.isbn = utils.invalid.getInvalidISBNNot10or13();
                }

                expect(result.getBook).to.exist;
                expect(testISBN_undefined).to.throw();
                expect(testISBNSetter_undefined).to.throw();
                expect(testISBN_null).to.throw();
                expect(testISBNSetter_null).to.throw();
                expect(testISBN_EmptyString).to.throw();
                expect(testISBNSetter_EmptyString).to.throw();
                expect(testISBN_10WithLetters).to.throw();
                expect(testISBNSetter_10WithLetters).to.throw();
                expect(testISBN_13WithLetters).to.throw();
                expect(testISBNSetter_13WithLetters).to.throw();
                expect(testISBN_not10or13).to.throw();
                expect(testISBNSetter_not10or13).to.throw();
            });
            // test 4
            it('Expect invalid genre to throw', function () {
                function testGenre_undefined() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), undefined, utils.valid.getDescription());
                }

                function testGenreSetter_undefined() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = undefined;
                }

                function testGenre_null() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), null, utils.valid.getDescription());
                }

                function testGenreSetter_null() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = null;
                }

                function testGenre_EmptyString() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), '', utils.valid.getDescription());
                }

                function testGenreSetter_EmptyString() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = '';
                }

                function testGenre_Short() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.invalid.getShorterGenre(), utils.valid.getDescription());
                }

                function testGenreSetter_Short() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = utils.invalid.getShorterGenre();
                }

                function testGenre_Long() {
                    var name = utils.valid.getName();
                    var isbn10 = utils.valid.getISBN10();
                    var genre = utils.invalid.getLongerGenre();
                    var description = utils.valid.getDescription();
                    result.getBook(name, isbn10, genre, description);
                }

                function testGenreSetter_Long() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = utils.invalid.getLongerGenre();
                }

                expect(result.getBook).to.exist;
                expect(testGenre_undefined).to.throw();
                expect(testGenreSetter_undefined).to.throw();
                expect(testGenre_null).to.throw();
                expect(testGenreSetter_null).to.throw();
                expect(testGenre_EmptyString).to.throw();
                expect(testGenreSetter_EmptyString).to.throw();
                expect(testGenre_Short).to.throw();
                expect(testGenreSetter_Short).to.throw();
                expect(testGenre_Long).to.throw();
                expect(testGenreSetter_Long).to.throw();
            });
            // test 5
            it('Expect invalid description to throw', function () {

                function testDescription_undefined() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), undefined);
                }

                function testDescriptionSetter_undefined() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.description = undefined;
                }

                function testDescription_null() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), null);
                }

                function testDescriptionSetter_null() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.description = null;
                }

                function testDescription_EmptyString() {
                    result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), '');
                }

                function testDescriptionSetter_EmptyString() {
                    var book = result.getBook(utils.valid.getName(), utils.valid.getISBN10(), utils.valid.getGenre(), utils.valid.getDescription());
                    book.genre = '';
                }

                expect(result.getMedia).to.exist;
                expect(testDescription_undefined).to.throw();
                expect(testDescriptionSetter_undefined).to.throw();
                expect(testDescription_null).to.throw();
                expect(testDescriptionSetter_null).to.throw();
                expect(testDescription_EmptyString).to.throw();
                expect(testDescriptionSetter_EmptyString).to.throw();
            });
        });
    });

    describe('Media tests', function () {
        describe('Valid tests', function () {
            // test 6
            it('expect getMedia to exist, to be a function and to return object with properties unique id, name, description, duration and rating', function () {
                var name,
                    duration,
                    rating,
                    description,
                    media,
                    i,
                    ids,
                    count;

                expect(result.getMedia).to.exist;
                expect(result.getMedia).to.be.a('function');

                name = utils.valid.getName();
                rating = utils.valid.getRating();
                duration = utils.valid.getDuration();
                description = utils.valid.getDescription();
                media = result.getMedia(name, rating, duration, description);
                expect(media).to.be.a('object');
                expect(media.name).to.be.a('string');
                expect(media.name).to.equal(name);

                expect(media.rating).to.be.a('number');
                expect(media.rating).to.equal(rating);

                expect(media.duration).to.be.a('number');
                expect(media.duration).to.equal(duration);

                expect(media.description).to.be.a('string');
                expect(media.description).to.equal(description);
                i = 0;
                expect(media.id).to.be.a('number');
                count = 10000;
                ids = {};
                while (i !== count) {
                    media = result.getMedia(name, rating, duration, description);
                    expect(ids[media.id]).to.be.undefined;
                    ids[media.id] = 1;
                    i += 1;
                }
            });
        });
        describe('Invalid tests', function () {
            // test 7
            it('Expect invalid name to throw', function () {

                function testName_undefined() {
                    /*jshint ignore: start */
                    var name = undefined;
                    /*jshint ignore: end */
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testNameSetter_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.name = undefined;
                }

                function testName_null() {
                    var name = null;
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testNameSetter_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.name = null;
                }


                function testName_EmptyString() {
                    var name = '';
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testNameSetter_EmptyString() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.name = '';
                }

                function testName_Short() {
                    var name = utils.invalid.getShorterName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testNameSetter_Short() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.name = utils.invalid.getShorterName();
                }

                function testName_Long() {
                    var name = utils.invalid.getLongerName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testNameSetter_Long() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.name = utils.invalid.getLongerName();
                }

                expect(result.getMedia).to.exist;
                expect(testName_undefined).to.throw();
                expect(testNameSetter_undefined).to.throw();
                expect(testName_null).to.throw();
                expect(testNameSetter_null).to.throw();
                expect(testName_EmptyString).to.throw();
                expect(testNameSetter_EmptyString).to.throw();
                expect(testName_Short).to.throw();
                expect(testNameSetter_Short).to.throw();
                expect(testName_Long).to.throw();
                expect(testNameSetter_Long).to.throw();
            });
            // test 8
            it('Expect invalid description to throw', function () {

                function testDescription_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description;
                    result.getMedia(name, rating, duration, description);
                }

                function testDescriptionSetter_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.description = undefined;
                }

                function testDescription_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = null;
                    result.getMedia(name, rating, duration, description);
                }

                function testDescriptionSetter_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.description = null;
                }

                function testDescription_EmptyString() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = '';
                    result.getMedia(name, rating, duration, description);
                }

                function testDescriptionSetter_EmptyString() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.description = '';
                }

                expect(result.getMedia).to.exist;
                expect(testDescription_undefined).to.throw();
                expect(testDescriptionSetter_undefined).to.throw();
                expect(testDescription_null).to.throw();
                expect(testDescriptionSetter_null).to.throw();
                expect(testDescription_EmptyString).to.throw();
                expect(testDescriptionSetter_EmptyString).to.throw();
            });
            // test 9
            it('Expect invalid rating to throw', function () {

                function testRating_undefined() {
                    var name = utils.valid.getName();
                    var rating;
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testRatingSetter_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.rating = undefined;
                }

                function testRating_null() {
                    var name = utils.valid.getName();
                    var rating = null;
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testRatingSetter_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.rating = null;
                }

                function testRating_Small() {
                    var name = utils.valid.getName();
                    var rating = utils.invalid.getSmallRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testRatingSetter_Small() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.rating = utils.invalid.getSmallRating();
                }


                function testRating_Large() {
                    var name = utils.valid.getName();
                    var rating = utils.invalid.getLargeRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testRatingSetter_Large() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.rating = utils.invalid.getLargeRating();
                }

                expect(result.getMedia).to.exist;
                expect(testRating_undefined).to.throw();
                expect(testRatingSetter_undefined).to.throw();
                expect(testRating_null).to.throw();
                expect(testRatingSetter_null).to.throw();
                expect(testRating_Small).to.throw();
                expect(testRatingSetter_Small).to.throw();
                expect(testRating_Large).to.throw();
                expect(testRatingSetter_Large).to.throw();
            });
            // test 10
            it('Expect invalid duration to throw', function () {

                function testDuration_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration;
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testDurationSetter_undefined() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.duration = undefined;
                }

                function testDuration_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = null;
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testDurationSetter_null() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.duration = null;
                }

                function testDuration_Zero() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = 0;
                    var description = utils.valid.getDescription();
                    result.getMedia(name, rating, duration, description);
                }

                function testDurationSetter_Zero() {
                    var name = utils.valid.getName();
                    var rating = utils.valid.getRating();
                    var duration = utils.valid.getDuration();
                    var description = utils.valid.getDescription();
                    var media = result.getMedia(name, rating, duration, description);
                    media.duration = 0;
                }

                expect(result.getBook).to.exist;
                expect(testDuration_undefined).to.throw();
                expect(testDurationSetter_undefined).to.throw();
                expect(testDuration_null).to.throw();
                expect(testDurationSetter_null).to.throw();
                expect(testDuration_Zero).to.throw();
                expect(testDurationSetter_Zero).to.throw();
            });
        });
    });

    describe('BookCatalog tests', function () {
        describe('Valid tests', function () {
            // test 11
            beforeEach(function(done) {
                result = require('../tasks/solution')();
                done();
            });
            it('expect getBookCatalog to exist, to be a function and to return object with properties name and unique id and methods: add(), find() with 1 param and search() with 1 param', function () {
                var name = utils.valid.getName(),
                    catalog = result.getBookCatalog(name);

                expect(result.getBookCatalog).to.exist;
                expect(result.getBookCatalog).to.be.a('function');
                expect(catalog).to.be.a('object');
                expect(catalog.name).to.be.a('string');
                expect(catalog.name).to.equal(name);

                expect(catalog.items).to.exist;
                expect(Array.isArray(catalog.items)).to.be.true;

                expect(catalog.add).to.exist;
                expect(catalog.add).to.be.a('function');

                expect(catalog.find).to.exist;
                expect(catalog.find).to.be.a('function');
                expect(catalog.find.length).to.equal(1);

                expect(catalog.search).to.exist;
                expect(catalog.search).to.be.a('function');
                expect(catalog.search.length).to.equal(1);

                expect(catalog.getGenres).to.exist;
                expect(catalog.getGenres).to.be.a('function');
                expect(catalog.getGenres.length).to.equal(0);
            });
            // test 12
            it('expect bookCatalog.add() to add books only and to work with array or books separated with comma', function () {
                var catalog,
                    name,
                    description,
                    isbn,
                    genre,
                    books,
                    resultOfAdd,
                    i;

                catalog = result.getBookCatalog(utils.valid.getName());
                books = [];
                for (i = 0; i < 3; i += 1) {
                    name = utils.valid.getName();
                    isbn = utils.valid.getISBN13();
                    genre = utils.valid.getGenre();
                    description = utils.valid.getDescription();
                    books.push(result.getBook(name, isbn, genre, description));
                }

                // test single item add
                resultOfAdd = catalog.add(books[0]);
                expect(catalog.items[0]).to.equal(books[0]);
                expect(resultOfAdd).to.equal(catalog);

                //test multiple items add
                catalog.add(books[1], books[2]);
                expect(catalog.items[1]).to.equal(books[1]);
                expect(catalog.items[2]).to.equal(books[2]);

                // test array add
                catalog.add(books);
                expect(catalog.items[3]).to.equal(books[0]);
                expect(catalog.items[4]).to.equal(books[1]);
                expect(catalog.items[5]).to.equal(books[2]);
            });
            // test 13
            it('expect bookCatalog.getGenres() to get unique genres', function () {
                var catalog,
                    genre,
                    book,
                    findResult,
                    i,
                    id = 100,
                    len = 10,
                    books = [];

                catalog = result.getBookCatalog(utils.valid.getName());

                // test with one book
                genre = 'generic';
                book = {
                    id: id,
                    name: utils.valid.getName(),
                    isbn: utils.valid.getISBN13(),
                    genre: genre,
                    description: utils.valid.getDescription()
                };
                catalog.items.push(book);
                findResult = catalog.getGenres();
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0]).to.equal(genre);

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    book = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        isbn: utils.valid.getISBN13(),
                        genre: ('generic ' + i),
                        description: utils.valid.getDescription()
                    };

                    books.push(book);
                    catalog.items.push(book);
                }

                findResult = catalog.getGenres();
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(len + 1);

                // test with no genre
                catalog = result.getBookCatalog(utils.valid.getName());
                findResult = catalog.getGenres();
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(0);//*/
            });
            // test 14
            it('expect bookCatalog.find() by id to find the leftmost book in the items array or return null', function () {
                var catalog,
                    book,
                    i,
                    id = 100,
                    len = 10,
                    books = [];

                catalog = result.getBookCatalog(utils.valid.getName());

                function testFindById_Undefined() {
                    catalog.find();
                }

                expect(testFindById_Undefined).to.throw();
                expect(catalog.find(id * id)).to.be.null;

                book = {
                    id: id,
                    name: utils.valid.getName(),
                    isbn: utils.valid.getISBN13(),
                    genre: utils.valid.getGenre(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(book);
                expect(catalog.find(id)).to.equal(book);

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    /*name = utils.valid.getName();
                     isbn = utils.valid.getISBN13();
                     genre = utils.valid.getGenre();
                     description = utils.valid.getDescription();
                     //book = result.getBook(name, isbn, genre, description); // dependant on getBook method //*/
                    book = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        isbn: utils.valid.getISBN13(),
                        genre: utils.valid.getGenre(),
                        description: utils.valid.getDescription()
                    };

                    books.push(book);
                    catalog.items.push(book);
                }

                for (i = 0; i < len; i += 1) {
                    expect(catalog.find(i + len)).to.equal(books[i]);
                }

                function testFindID_undefined() {
                    catalog.find();
                }

                function testFindID_null() {
                    catalog.find(null);
                }

                function testFindID_string() {
                    catalog.find('text');
                }

                expect(testFindID_undefined).to.throw();
                expect(testFindID_null).to.throw();
                expect(testFindID_string).to.throw();
            });
            // test 15
            it('expect bookCatalog.find() by options to find an array of book in the items array or return null', function () {
                var catalog,
                    book,
                    findResult,
                    i,
                    id = 100,
                    len = 10,
                    books = [];

                catalog = result.getBookCatalog(utils.valid.getName());

                function testFindById_Undefined() {
                    catalog.find();
                }

                expect(testFindById_Undefined).to.throw();
                expect(catalog.find({name: 'nonexistent'})).to.exits;
                expect(Array.isArray(catalog.find({name: 'nonexistent'}))).to.be.true;
                expect(catalog.find({name: 'nonexistent'}).length).to.exits; // it is an array-like object
                expect(catalog.find({name: 'nonexistent'}).length).to.equal(0);

                // test with one book
                book = {
                    id: id,
                    name: utils.valid.getName(),
                    isbn: utils.valid.getISBN13(),
                    genre: utils.valid.getGenre(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(book);
                findResult = catalog.find({id: id});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0]).to.equal(book);

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    book = {
                        id: (i + len),
                        name: 'myName',
                        isbn: utils.valid.getISBN13(),
                        genre: ('generic' + i),
                        description: utils.valid.getDescription()
                    };

                    books.push(book);
                    catalog.items.push(book);
                }

                findResult = catalog.find({name: 'myName'});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(len);

                findResult = catalog.find({id: 2 + len, name: 'myName'});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0]).to.equal(books[2]);

                // test search by genre
                findResult = catalog.find({genre: 'generic1'});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
            });
            // test 16
            it('expect bookCatalog.search() to return an array of found items or empty array', function () {
                var i,
                    catalog,
                    book,
                    pattern,
                    len = 100;
                catalog = result.getBookCatalog(utils.valid.getName());

                book = {
                    id: 123456,
                    name: utils.valid.getName(),
                    isbn: utils.valid.getISBN13(),
                    genre: utils.valid.getGenre(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(book);

                pattern = book.name.substr(1, book.name.length / 2);
                expect(catalog.search(pattern)).to.eql([book]);

                pattern = book.description.substr(3, 6);
                expect(catalog.search(pattern)).to.eql([book]);
                // test with multiple books
                catalog.items = [];
                for (i = 0; i < len; i += 1) {
                    book = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        isbn: utils.valid.getISBN13(),
                        genre: utils.valid.getGenre(),
                        description: utils.valid.getDescription()
                    };
                    catalog.items.push(book);
                }
                pattern = catalog.items[0].name.substr(1, 3);
                var matchingBooks = catalog.items.filter(function (book) {
                    return book.name.indexOf(pattern) >= 0 ||
                        book.description.indexOf(pattern) >= 0;
                });
                expect(catalog.search(pattern)).to.eql(matchingBooks);
            });
            // test 17
            it('Expect bookCatalog.search() to return empty array, when no books in catalog and when no books that contain the pattern ', function () {
                var catalog,
                    i,
                    pattern,
                    len = 100,
                    namePrefix = utils.valid.getGenre(),
                    isbn = utils.valid.getISBN10(),
                    genre = utils.valid.getGenre(),
                    description = utils.valid.getDescription();
                catalog = result.getBookCatalog(utils.valid.getName());

                expect(catalog.search('asdsad')).to.eql([]);
                catalog.items = [];
                for (i = 0; i < len; i += 1) {
                    catalog.items.push(result.getBook(namePrefix + i, isbn, genre, description));
                }
                pattern = namePrefix.substr(0, namePrefix.length - 1);
                pattern += 'Something that surely cannot be found in the valid genre';
                expect(catalog.search(pattern)).to.eql([]);
            });
        });
        describe('Invalid tests', function () {
            // test 18
            beforeEach(function(done) {
                result = require('../tasks/solution')();
                done();
            });
            it('Expect bookCatalog.search() to throw if pattern is undefined, null or empty string ', function () {
                var catalog = result.getBookCatalog(utils.valid.getName());

                function testSearch_Undefined() {
                    catalog.search();
                }

                function testSearch_null() {
                    catalog.search(null);
                }

                function testSearch_EmptyString() {
                    catalog.search('');
                }

                expect(testSearch_Undefined).to.throw();
                expect(testSearch_null).to.throw();
                expect(testSearch_EmptyString).to.throw();
            });
            // test 19
            it('expect invalid name to throw', function () {
                var catalog,
                    name,
                    count,
                    i,
                    ids;

                name = utils.valid.getName();
                catalog = result.getBookCatalog(name);

                // test if id is unique
                expect(catalog.id).to.be.a('number');
                count = 10000;
                ids = {};
                for (i = 0; i < count; i += 1) {
                    catalog = result.getBookCatalog(utils.valid.getName());
                    expect(ids[catalog.id]).to.be.undefined;
                    ids[catalog.id] = 1;
                }

                // test name exceptions
                function testName_undefined() {
                    result.getBookCatalog();
                }

                function testNameSetter_undefined() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = undefined;
                }

                function testName_null() {
                    result.getBookCatalog(null);
                }

                function testNameSetter_null() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = null;
                }

                function testName_Empty() {
                    result.getBookCatalog('');
                }

                function testNameSetter_Empty() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = '';
                }

                function testName_Short() {
                    result.getBookCatalog(utils.invalid.getShorterName());
                }

                function testNameSetter_Short() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = utils.invalid.getShorterName();
                }

                function testName_Long() {
                    result.getBookCatalog(utils.invalid.getLongerName());
                }

                function testNameSetter_Long() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = utils.invalid.getLongerName();
                }

                expect(testName_undefined).to.throw();
                expect(testNameSetter_undefined).to.throw();
                expect(testName_null).to.throw();
                expect(testNameSetter_null).to.throw();
                expect(testName_Empty).to.throw();
                expect(testNameSetter_Empty).to.throw();
                expect(testName_Short).to.throw();
                expect(testNameSetter_Short).to.throw();
                expect(testName_Long).to.throw();
                expect(testNameSetter_Long).to.throw();
            });
            // test 20
            it('expect bookCatalog.add() to throw', function () {
                var duration,
                    rating,
                    description,
                    name = utils.valid.getName(),
                    catalog = result.getBookCatalog(name);

                // add invalid book
                function testAdd_undefined() {
                    catalog.add();
                }

                function testAdd_null() {
                    catalog.add(null);
                }

                function testAdd_Empty() {
                    catalog.add({});
                }

                function testAdd_Media() {
                    var media;
                    name = utils.getName();
                    duration = utils.valid.getDuration();
                    rating = utils.valid.getRating();
                    description = utils.getDescription();

                    media = result.getMedia(name, duration, rating, description);
                    catalog.add(media);
                }

                function testAdd_InvalidBook() {
                    var book = {
                        isbn: utils.valid.getISBN10(),
                        genre: utils.valid.getGenre()
                    };
                    catalog.add(book);
                }

                expect(testAdd_undefined).to.throw();
                expect(testAdd_null).to.throw();
                expect(testAdd_Empty).to.throw();
                expect(testAdd_Media).to.throw();
                expect(testAdd_InvalidBook).to.throw();
            });
        });
    });
    describe('MediaCatalog tests', function () {
        describe('Valid tests', function () {
            // test 21
            beforeEach(function(done) {
                result = require('../tasks/solution')();
                done();
            });
            it('expect getMediaCatalog to exist, to be a function and to return object with properties name and unique id and methods: add(), find() with 1 param and search() with 1 param', function () {
                var name = utils.valid.getName(),
                    catalog = result.getMediaCatalog(name);

                expect(result.getMediaCatalog).to.exist;
                expect(result.getMediaCatalog).to.be.a('function');
                expect(catalog).to.be.a('object');
                expect(catalog.name).to.be.a('string');
                expect(catalog.name).to.equal(name);

                expect(catalog.items).to.exist;
                expect(Array.isArray(catalog.items)).to.be.true;

                expect(catalog.add).to.exist;
                expect(catalog.add).to.be.a('function');

                expect(catalog.find).to.exist;
                expect(catalog.find).to.be.a('function');
                expect(catalog.find.length).to.equal(1);

                expect(catalog.search).to.exist;
                expect(catalog.search).to.be.a('function');
                expect(catalog.search.length).to.equal(1);

                expect(catalog.getTop).to.exist;
                expect(catalog.getTop).to.be.a('function');
                expect(catalog.getTop.length).to.equal(1);

                expect(catalog.getSortedByDuration).to.exist;
                expect(catalog.getSortedByDuration).to.be.a('function');
                expect(catalog.getSortedByDuration.length).to.equal(0);
            });
            // test 22
            it('expect mediaCatalog.add() to add media only and to work with array or media separated with comma', function () {
                var catalog,
                    name,
                    description,
                    rating,
                    duration,
                    medias,
                    resultOfAdd,
                    i;

                catalog = result.getMediaCatalog(utils.valid.getName());
                medias = [];
                for (i = 0; i < 3; i += 1) {
                    name = utils.valid.getName();
                    rating = utils.valid.getRating();
                    duration = utils.valid.getDuration();
                    description = utils.valid.getDescription();
                    medias.push(result.getMedia(name, rating, duration, description));
                }

                // test single item add
                resultOfAdd = catalog.add(medias[0]);
                expect(catalog.items[0]).to.equal(medias[0]);
                expect(resultOfAdd).to.equal(catalog);

                //test multiple items add
                catalog.add(medias[1], medias[2]);
                expect(catalog.items[1]).to.equal(medias[1]);
                expect(catalog.items[2]).to.equal(medias[2]);

                // test array addmedias
                catalog.add(medias);
                expect(catalog.items[3]).to.equal(medias[0]);
                expect(catalog.items[4]).to.equal(medias[1]);
                expect(catalog.items[5]).to.equal(medias[2]);
            });
            // test 23
            it('expect mediaCatalog.getTop() to get unique genres', function () {
                var catalog,
                    name,
                    rating,
                    media,
                    findResult,
                    top,
                    i,
                    id = 100,
                    len = 20,
                    medias = [];

                catalog = result.getMediaCatalog(utils.valid.getName());

                // test with one medias
                rating = 1;
                name = 'generic';
                media = {
                    id: id,
                    name: name,
                    rating: rating,
                    duration: utils.valid.getDuration(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(media);
                findResult = catalog.getTop(len);
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0].name).to.equal(name);
                expect(findResult[0].rating).to.not.exist;
                expect(findResult[0].duration).to.not.exist;
                expect(findResult[0].description).to.not.exist;

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    media = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        rating: rating,
                        duration: utils.valid.getDuration(),
                        description: utils.valid.getDescription()
                    };

                    medias.push(media);
                    catalog.items.push(media);
                }

                top = 5;
                findResult = catalog.getTop(top);
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(top);

                top = 30;
                findResult = catalog.getTop(top);
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(len + 1);

                function testGetTop_NaN() {
                    catalog.getTop('text');
                }

                function testGetTop_ltOne() {
                    catalog.getTop(0);
                }

                expect(testGetTop_NaN).to.throw();
                expect(testGetTop_ltOne).to.throw();
            });
            // test 24
            it('expect mediaCatalog.find() by id to find the leftmost media in the items array or return null', function () {
                var catalog,
                    media,
                    book,
                    i,
                    id = 100,
                    len = 10,
                    books = [];

                catalog = result.getMediaCatalog(utils.valid.getName());

                function testFindById_Undefined() {
                    catalog.find();
                }

                expect(testFindById_Undefined).to.throw();
                expect(catalog.find(id * id)).to.be.null;

                media = {
                    id: id,
                    name: utils.valid.getName(),
                    rating: utils.valid.getRating(),
                    duration: utils.valid.getDuration(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(media);
                expect(catalog.find(id)).to.equal(media);

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    book = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        isbn: utils.valid.getISBN13(),
                        genre: utils.valid.getGenre(),
                        description: utils.valid.getDescription()
                    };

                    books.push(book);
                    catalog.items.push(book);
                }

                for (i = 0; i < len; i += 1) {
                    expect(catalog.find(i + len)).to.equal(books[i]);
                }

                function testFindID_undefined() {
                    catalog.find();
                }

                function testFindID_null() {
                    catalog.find(null);
                }

                function testFindID_string() {
                    catalog.find('text');
                }

                expect(testFindID_undefined).to.throw();
                expect(testFindID_null).to.throw();
                expect(testFindID_string).to.throw();//*/
            });
            // test 25
            it('expect mediaCatalog.find() by options to find an array of media in the items array or return null', function () {
                var catalog,
                    media,
                    findResult,
                    i,
                    id = 100,
                    len = 10,
                    medias = [];

                catalog = result.getMediaCatalog(utils.valid.getName());

                function testFindById_Undefined() {
                    catalog.find();
                }

                expect(testFindById_Undefined).to.throw();
                expect(catalog.find({name: 'nonexistent'})).to.exits;
                expect(Array.isArray(catalog.find({name: 'nonexistent'}))).to.be.true;
                expect(catalog.find({name: 'nonexistent'}).length).to.exits; // it is an array-like object
                expect(catalog.find({name: 'nonexistent'}).length).to.equal(0);

                // test with one book
                media = {
                    id: id,
                    name: utils.valid.getName(),
                    rating: 4,
                    duration: utils.valid.getDuration(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(media);
                findResult = catalog.find({id: id});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0]).to.equal(media);

                // test with multiple books
                for (i = 0; i < len; i += 1) {
                    media = {
                        id: (i + len),
                        name: 'myName',
                        rating: 3,
                        duration: utils.valid.getDuration(),
                        description: utils.valid.getDescription()
                    };

                    medias.push(media);
                    catalog.items.push(media);
                }

                findResult = catalog.find({name: 'myName'});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(len);

                findResult = catalog.find({id: 2 + len, name: 'myName'});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
                expect(findResult[0]).to.equal(medias[2]);

                // test search by genre
                findResult = catalog.find({rating: 4});
                expect(findResult).to.exits;
                expect(findResult.length).to.equal(1);
            });
            // test 26
            it('expect mediaCatalog.search() to return an array of found items or empty array', function () {
                var i,
                    catalog,
                    media,
                    pattern,
                    len = 100;
                catalog = result.getMediaCatalog(utils.valid.getName());

                media = {
                    id: 123456,
                    name: utils.valid.getName(),
                    rating: utils.valid.getRating(),
                    duration: utils.valid.getDuration(),
                    description: utils.valid.getDescription()
                };
                catalog.items.push(media);

                pattern = media.name.substr(1, media.name.length / 2);
                expect(catalog.search(pattern)).to.eql([media]);

                pattern = media.description.substr(3, 6);
                expect(catalog.search(pattern)).to.eql([media]);
                // test with multiple books
                catalog.items = [];
                for (i = 0; i < len; i += 1) {
                    media = {
                        id: (i + len),
                        name: utils.valid.getName(),
                        rating: utils.valid.getRating(),
                        duration: utils.valid.getDuration(),
                        description: utils.valid.getDescription()
                    };
                    catalog.items.push(media);
                }
                pattern = catalog.items[0].name.substr(1, 3);
                var matchingMedia = catalog.items.filter(function (media) {
                    return media.name.indexOf(pattern) >= 0 ||
                        media.description.indexOf(pattern) >= 0;
                });
                expect(catalog.search(pattern)).to.eql(matchingMedia);
            });
            // test 27
            it('Expect mediaCatalog.search() to return empty array, when no media in catalog and when no media that contain the pattern ', function () {
                var catalog,
                    i,
                    pattern,
                    len = 100,
                    namePrefix = utils.valid.getGenre(),
                    duration = utils.valid.getDuration(),
                    rating = utils.valid.getRating(),
                    description = utils.valid.getDescription();
                catalog = result.getMediaCatalog(utils.valid.getName());

                expect(catalog.search('asdsad')).to.eql([]);

                catalog.items = [];
                for (i = 0; i < len; i += 1) {
                    catalog.items.push(result.getMedia(namePrefix + i, rating, duration, description));
                }
                pattern = namePrefix.substr(0, namePrefix.length - 1);
                pattern += 'Something that surely cannot be found in the valid genre';
                expect(catalog.search(pattern)).to.eql([]);
            });
        });
        describe('Invalid tests', function () {
            // test 28
            beforeEach(function(done) {
                result = require('../tasks/solution')();
                done();
            });
            it('Expect mediaCatalog.search() to throw if pattern is undefined, null or empty string ', function () {
                var catalog = result.getMediaCatalog(utils.valid.getName());

                function testSearch_Undefined() {
                    catalog.search();
                }

                function testSearch_null() {
                    catalog.search(null);
                }

                function testSearch_EmptyString() {
                    catalog.search('');
                }

                expect(testSearch_Undefined).to.throw();
                expect(testSearch_null).to.throw();
                expect(testSearch_EmptyString).to.throw();
            });
            // test 29
            it('expect invalid name to throw', function () {
                var catalog,
                    name,
                    count,
                    i,
                    ids;

                name = utils.valid.getName();
                catalog = result.getMediaCatalog(name);

                // test if id is unique
                expect(catalog.id).to.be.a('number');
                count = 10000;
                ids = {};
                for (i = 0; i < count; i += 1) {
                    catalog = result.getMediaCatalog(utils.valid.getName());
                    expect(ids[catalog.id]).to.be.undefined;
                    ids[catalog.id] = 1;
                }

                // test name exceptions
                function testName_undefined() {
                    result.getMediaCatalog();
                }

                function testNameSetter_undefined() {
                    catalog = result.getMediaCatalog(utils.getName());
                    catalog.name = undefined;
                }

                function testName_null() {
                    result.getMediaCatalog(null);
                }

                function testNameSetter_null() {
                    catalog = result.getMediaCatalog(utils.getName());
                    catalog.name = null;
                }

                function testName_Empty() {
                    result.getMediaCatalog('');
                }

                function testNameSetter_Empty() {
                    catalog = result.getMediaCatalog(utils.getName());
                    catalog.name = '';
                }

                function testName_Short() {
                    result.getMediaCatalog(utils.invalid.getShorterName());
                }

                function testNameSetter_Short() {
                    catalog = result.getMediaCatalog(utils.getName());
                    catalog.name = utils.invalid.getShorterName();
                }

                function testName_Long() {
                    result.getMediaCatalog(utils.invalid.getLongerName());
                }

                function testNameSetter_Long() {
                    catalog = result.getBookCatalog(utils.getName());
                    catalog.name = utils.invalid.getLongerName();
                }

                expect(testName_undefined).to.throw();
                expect(testNameSetter_undefined).to.throw();
                expect(testName_null).to.throw();
                expect(testNameSetter_null).to.throw();
                expect(testName_Empty).to.throw();
                expect(testNameSetter_Empty).to.throw();
                expect(testName_Short).to.throw();
                expect(testNameSetter_Short).to.throw();
                expect(testName_Long).to.throw();
                expect(testNameSetter_Long).to.throw();
            });
            // test 30
            it('expect mediaCatalog.add() to throw', function () {
                var duration,
                    rating,
                    description,
                    media,
                    name = utils.valid.getName(),
                    catalog = result.getMediaCatalog(name);

                // add invalid book
                function testAdd_undefined() {
                    catalog.add();
                }

                function testAdd_null() {
                    catalog.add(null);
                }

                function testAdd_Empty() {
                    catalog.add({});
                }

                function testAdd_Media() {
                    name = utils.getName();
                    duration = utils.valid.getDuration();
                    rating = utils.valid.getRating();
                    description = utils.getDescription();

                    media = result.getMedia(name, duration, rating, description);
                    catalog.add(media);
                }

                function testAdd_InvalidMedia() {
                    media = {
                        rating: utils.valid.Rating(),
                        duration: utils.valid.getDuration()
                    };
                    catalog.add(media);
                }

                expect(testAdd_undefined).to.throw();
                expect(testAdd_null).to.throw();
                expect(testAdd_Empty).to.throw();
                expect(testAdd_Media).to.throw();
                expect(testAdd_InvalidMedia).to.throw();
            });
        });
    });
});