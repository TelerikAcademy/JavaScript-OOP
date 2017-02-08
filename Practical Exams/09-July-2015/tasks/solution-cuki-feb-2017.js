function solve() {
	const getNextId = (function() {
		let counter = 0;
		return function() {
			counter += 1;
			return counter;
		};
	})();

	function validateNonEmpty(str) {
		if(typeof str !== 'string' || str === '') {
			throw 'Str is not valid';
		}
	}
	function validateLengthRange(str, min, max) {
		if(typeof str !== 'string') {
			throw 'Str is not valid';
		}
		validateNumberRange(str.length, min, max);
	}
	function validateIsbn(isbn) {
		if(typeof isbn !== 'string' || !isbn.match(/^([0-9]{10}|[0-9]{13})$/)) {
			throw 'Isbn is not valid';
		}
	}

	function validateNumberRange(n, min, max) {
		if(typeof n !== 'number' || n < min || n > max) {
			throw 'Not a valid number';
		}
	}
	function validateNumberBigger(n, min) {
		if(typeof n !== 'number' || n <= min) {
			throw 'Not a valid number';
		}
	}

	class Item {
		constructor(name, description) {
			this.name = name
			this.description = description;
			this._id = getNextId();
		}

		get name() {
			return this._name;
		}
		set name(name) {
			validateLengthRange(name, 2, 40);
			this._name = name;
		}

		get description() {
			return this._description;
		}
		set description(description) {
			validateNonEmpty(description);
			this._description = description;
		}

		get id() {
			return this._id;
		}
	}

	class Book extends Item {
		constructor(name, isbn, genre, description) {
			super(name, description);

			this.isbn = isbn;
			this.genre = genre;
		}

		get isbn() {
			return this._isbn;
		}
		set isbn(isbn) {
			validateIsbn(isbn);
			this._isbn = isbn;
		}

		get genre() {
			return this._genre;
		}
		set genre(genre) {
			validateLengthRange(genre, 2, 20);
			this._genre = genre;
		}
	}

	class Media extends Item {
		constructor(name, rating, duration, description) {
			super(name, description);

			this.duration = duration;
			this.rating = rating;
		}

		get duration() {
			return this._duration;
		}
		set duration(duration) {
			validateNumberBigger(duration, 0);
			this._duration = duration;
		}

		get rating() {
			return this._rating;
		}
		set rating(rating) {
			validateNumberRange(rating, 1, 5);
			this._rating = rating;
		}
	}

	class Catalog {
		constructor(name) {
			this.name = name;
			this._id = getNextId();
			this._items = [];
		}

		get name() {
			return this._name;
		}
		set name(name) {
			validateLengthRange(name, 2, 40);
			this._name = name;
		}

		get items() {
			return this._items; // .slice();
		}
		/*set items(items) {
			this._items = items;
		}*/

		get id() {
			return this._id;
		}

		add(...items) {
			//const items = [].slice.call(arguments);

			if(Array.isArray(items[0])) {
				items = items[0];
			}

			if(items.length === 0) {
				throw 'At least one item must be specified';
			}

			items.forEach(item => {
				if(typeof item !== 'object') {
					throw 'Item not an object';
				}

				validateNumberBigger(item.id, 0);
				validateLengthRange(item.name, 2, 40);
				validateNonEmpty(item.description);
			});

			this._items.push(...items);
			// Array.prototype.apply(this._items, items);
			// items.forEach(item => this._items.push(item));

			return this;
		}

		find(arg) {
			function findById(id) {
				if(typeof id !== 'number') {
					throw 'Invalid id';
				}

				return this._items.find(item => item.id === id) || null;
				/*
				const item = this._items.find(item => item.id === id);
				if(typeof item === 'undefined') {
					item = null;
				}
				return item;
				*/
			}

			function findByOptions(options) {
				return this._items.filter(item => {
					return (
						(!options.hasOwnProperty('name') || item.name === options.name)
					 && (!options.hasOwnProperty('id') || item.id === options.id));
				});
			}

			if(typeof arg === 'object') {
				return findByOptions.call(this, arg);
			}
			return findById.call(this, arg);
		}

		search(pattern) {
			validateNonEmpty(pattern);

			return this._items.filter(item => {
				return (
					item.name.indexOf(pattern) >= 0
				|| item.description.indexOf(pattern) >= 0);
			});
		}
	}

	class BookCatalog extends Catalog {
		constructor(name) {
			super(name);
		}

		add(...books) {
			if(Array.isArray(books[0])) {
				books = books[0];
			}

			books.forEach(book => {
				if(typeof book !== 'object') {
					throw 'Item not an object';
				}

				validateIsbn(book.isbn);
				validateLengthRange(book.genre, 2, 20);
			});

			return super.add(books);
			// return this;
		}

		getGenres() {
			return this._items
				.map(book => book.genre.toLowerCase())
				.sort()
				.filter((genre, index, genres) => genre !== genres[index - 1]);
		}

		find(arg) {
			if(typeof arg === 'object') {
				const books = super.find(arg);
				if(arg.hasOwnProperty('genre')) {
					return books.filter(book => book.genre === arg.genre);
				}
				return books;
			}

			return super.find(arg);
		}
	}

	class MediaCatalog extends Catalog {
		constructor(name) {
			super(name);
		}

		add(...medias) {
			if(Array.isArray(medias[0])) {
				medias = medias[0];
			}

			medias.forEach(media => {
				if(typeof media !== 'object') {
					throw 'Item not an object';
				}

				validateNumberBigger(media.duration, 0);
				validateNumberRange(media.rating, 1, 5);
			});

			return super.add(medias);
			// return this;
		}

		getTop(count) {
			validateNumberBigger(count, 0);

			return this._items
				.slice()
				.sort((x, y) => y.rating - x.rating)
				.slice(0, count)
				.map(x => {
					return {
						name: x.name,
						id: x.id
					};
				});
		}

		getSortedByDuration() {
			return this._items
				.slice()
				.sort((x, y) => {
					if(x.duration === y.duration) {
						return x.id - y.id;
					}
					return y.duration - x.duration;
				});
		}

		find(arg) {
			if(typeof arg === 'object') {
				const medias = super.find(arg);
				if(arg.hasOwnProperty('rating')) {
					return medias.filter(media => media.rating === arg.rating);
				}
				return medias;
			}

			return super.find(arg);
		}
	}

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
