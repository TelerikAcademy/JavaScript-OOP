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
					LONG: new Array(101).join('A')
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
				expect(book.id).to.exist;
				expect(book.id).to.be.a('number');
				expect(book.id).to.be.at.least(1);
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
					book: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				});
				expect(library.books.list()).to.eql([book]);
			});

			it('expect to return array with single book, when category is provided and single book in that category is added', function () {
				var book = library.books.add({
					book: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				});
				expect(library.books.list({
					category: book.category
				})).to.eql([book]);
			});

			it('expect to return empty array, when category is provided and there is no book with this category', function () {
				var book = library.books.add({
					book: CONSTS.VALID.BOOK_TITLE,
					isbn: CONSTS.VALID.BOOK_ISBN,
					author: CONSTS.VALID.AUTHOR,
					category: CONSTS.VALID.CATEGORY
				});
				expect(library.books.list({
					category: 'NOT-' + book.category
				})).to.eql([]);
			});
		});

		it('expect library.categories to exist', function () {
			expect(library.categories).to.exist;
		});
	});
});