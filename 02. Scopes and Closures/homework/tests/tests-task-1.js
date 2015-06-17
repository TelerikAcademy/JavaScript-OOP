/* globals describe, it, beforeEach */
var expect = require('chai').expect;

describe('Tests for Closures and Scopes in JavaScript', function () {
	var library,
		CONSTS = {
			VALID: {
				BOOK_TITLE: 'BOOK #',
				BOOK_ISBN: {
					TEN_DIGITS: '1234567890',
					THIRTEEN_DIGITS: '1234567890123',
				},
				AUTHOR: 'John Doe',
				CATEGORY: 'Book Category'
			},
			INVALID: {
				BOOK_TITLE: {
					SHORT: 'B',
					LONG: new Array(102).join('A')
				},
				AUTHOR: '',
				BOOK_ISBN: '1234'
			}
		};

	describe('"Task 1: Library"', function () {
		beforeEach(function (done) {
			library = require('../tasks/task-1')();
			done();
		});

		it('expect library to exist', function () {
			expect(library).to.exist;
		});

		it('expect library.books to exist', function () {
			expect(library.books).to.exist;
		});

		it('expect library.categories to exist', function () {
			expect(library.categories).to.exist;
		});

		describe('library.books.add', function () {
			it('expect to exist and to be a function', function () {
				expect(library.books.add).to.exist;
				expect(library.books.add).to.be.a('function');
			});

			it('expect the book to be returned with generated ID(number greater than 1), when title, ISBN and author are valid', function () {
				var bookToAdd = {
					title: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				};
				var book = library.books.add(bookToAdd);
				expect(book.ID).to.exist;
				expect(book.ID).to.be.a('number');
				expect(book.ID).to.be.at.least(1);
				expect(book.title).to.equal(bookToAdd.title);
				expect(book.isbn).to.equal(bookToAdd.isbn);
				expect(book.author).to.equal(bookToAdd.author);
			});

			it('expect to throw, when missing title, category, author and isbn', function () {
				function test() {
					library.books.add();
				}
				expect(test).to.throw();
			});

			it('expect to throw, when with invalid title (short)', function () {
				function test() {
					library.books.add({
						title: CONSTS.INVALID.BOOK_TITTE.SHORT,
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
				}
				expect(test).to.throw();
			});

			it('expect to throw, when with invalid title (long)', function () {
				function test() {
					library.books.add({
						title: CONSTS.INVALID.BOOK_TITTE.LONG,
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
				}
				expect(test).to.throw();
			});

			it('expect to throw, when with invalid isbn', function () {
				function test() {
					library.books.add({
						title: CONSTS.VALID.AUTHOR,
						isbn: CONSTS.INVALID.BOOK_ISBN,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
				}
				expect(test).to.throw();
			});

			it('expect to throw, when with invalid author', function () {
				function test() {
					library.books.add({
						title: CONSTS.VALID.AUTHOR,
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.INVALID.AUTHOR
					});
				}
				expect(test).to.throw();
			});

			it('expect to throw, when book with repeating title is added', function () {
				var book = {
					title: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				},
					book2 = {
					title: CONSTS.VALID.BOOK_TITLE, // same title
					isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS, // different ISBN
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				};
				library.books.add(book);
				function test() {
					library.books.add(Object.create(book2));
				}
				expect(test).to.throw();
			});

			it('expect to throw, when book with repeating ISBN is added', function () {
				var book = {
					title: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				},
					book2 = {
					title: CONSTS.VALID.BOOK_TITLE + (Math.random()*1000 + ''), // different title
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS, // same ISBN
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				};
				library.books.add(book);
				function test() {
					library.books.add(Object.create(book2));
				}
				expect(test).to.throw();
			});

		});


		describe('library.books.list', function () {
			it('expect to exist and to be a function', function () {
				expect(library.books.list).to.exist;
				expect(library.books.list).to.be.a('function');
			});
			it('expect to return empty array, when no books are added', function () {
				expect(library.books.list()).to.eql([]);
			});
			it('expect to return array with single book, when a single book is added', function () {
				var book = library.books.add({
					title: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				});
				expect(library.books.list()).to.eql([book]);
			});

			it('expect to return empty array, when category is provided and no book in that category is added', function () {
					var book = library.books.add({
						title: CONSTS.VALID.BOOK_TITLE,
						isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
					expect(library.books.list({
						category: book.category + (Math.random()*1000 + '')
					})).to.eql([]);
			});

			it('expect to return array with single book, ' +
				'when category is provided and single book in that category is added', function () {
					var book = library.books.add({
						title: CONSTS.VALID.BOOK_TITLE,
						isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
					expect(library.books.list({
						category: book.category
					})).to.eql([book]);
				});
			it('expect to return array with single book, ' +
				'when category is provided, there are other books ' +
				'and single book in that category is added', function () {
					library.books.add({
						title: CONSTS.VALID.BOOK_TITLE + (Math.random() * 1000 + '').substr(3, 10),
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.VALID.AUTHOR + 'test',
						category: CONSTS.VALID.CATEGORY + (Math.random() * 1000 + '').substr(3, 10)
					});

					var book = library.books.add({
						title: CONSTS.VALID.BOOK_TITLE,
						isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS.substr(0, 11) + '11',
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});

					library.books.add({
						title: CONSTS.VALID.BOOK_TITLE + 'test',
						isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS,
						author: CONSTS.VALID.AUTHOR + 'test',
						category: CONSTS.VALID.CATEGORY + 'another'
					});

					expect(library.books.list({
						category: book.category
					})).to.eql([book]);
				});
			it('expect to return empty array, ' +
				'when category is provided and there is no book with this category', function () {
					var book = library.books.add({
						title: CONSTS.VALID.BOOK_TITLE,
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
					expect(library.books.list({
						category: 'NOT-' + book.category
					})).to.eql([]);
				});


			it('expect to return empty array, ' +
				'when author is provided and there is no book of this author', function () {
					var book = library.books.add({
						title: CONSTS.VALID.BOOK_TITLE,
						isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
						author: CONSTS.VALID.AUTHOR,
						category: CONSTS.VALID.CATEGORY
					});
					expect(library.books.list({
						author: 'NOT-' + book.author
					})).to.eql([]);
				});
		});

		describe('library.categories.list', function () {
			it('expect to exist and to be a function', function () {
				expect(library.categories.list).to.exist;
				expect(library.categories.list).to.be.a('function');
			});

			it('expect to return empty array, when no books are added', function () {
				expect(library.categories.list()).to.eql([]);
			});

			it('expect to return array with single category, when books from the same category are added', function () {
				var book = {
					title: CONSTS.VALID.BOOK_TITLE + 1,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				},
					book2 = {
					title: CONSTS.VALID.BOOK_TITLE + 2,
					isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				};
				library.books.add(book);
				library.books.add(book2);
				expect(library.categories.list()).to.eql([book.category]);
			});

			it('expect to return array with single category, when a single book is added', function () {
				var book = {
					title: CONSTS.VALID.BOOK_TITLE + 1,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				};
				library.books.add(book);
				expect(library.categories.list()).to.eql([book.category]);
			});

			it('expect to return array with correctly ordered categories, when there are books of a different category', function () {
				var books = [{
					title: CONSTS.VALID.BOOK_TITLE + 0,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '5',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '5'
				}, {
					title: CONSTS.VALID.BOOK_TITLE + 1,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '4',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '3'
				}, {
					title: CONSTS.VALID.BOOK_TITLE + 2,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '3',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '7'
				}, {
					title: CONSTS.VALID.BOOK_TITLE + 5,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '0',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '3'
				}, {
					title: CONSTS.VALID.BOOK_TITLE + 4,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '1',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '5'
				}, {
					title: CONSTS.VALID.BOOK_TITLE + 3,
					isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS.substring(0, 9) + '2',
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY + '7'
				}];
				for(i in books) {
					library.books.add(books[i]);
				}
				expect(library.categories.list()).to.eql([books[0].category, books[1].category, books[2].category]);
			});
		});
	});
});