/* globals module */

function solve() {
    function* idGenerator() {
        let lastId = 0,
            forever = true;

        while (forever) {
            yield(lastId += 1);
        }
    }

    let itemsIdGenerator = idGenerator();

    const validator = {
        isStringValid(str, min = 1, max = Number.MAX_VALUE) {
            return (typeof str === "string") &&
                str.length >= min && str.length <= max;
        },
        isNumberValid(n, min = 0, max = Number.MAX_VALUE) {
            return (typeof n === "number") && min <= n && n <= max;
        },
        isNonEmptyArrayWithValidObjects(array, validFunc) {
            validFunc = validFunc || function() {
                return true;
            };
            return Array.isArray(array) && array.length > 0 &&
                array.every(validFunc);
        }
    };

    const MIN_ITEM_NAME_LENGHT = 2,
        MAX_ITEM_NAME_LENGHT = 40;

    const ISBN_LENGTH_10 = 10,
        ISBN_LENGTH_13 = 13;

    const MIN_GENRE_LENGTH = 2,
        MAX_GENRE_LENGTH = 20;

    const MIN_RATING = 1,
        MAX_RATING = 5;

    const MIN_CATALOG_NAME_LENGHT = 2,
        MAX_CATALOG_NAME_LENGTH = 40;

    const MIN_GET_TOP_COUNT = 1,
        MIN_PATTERN_LENGTH = 1;

    class Item {
        constructor(name, description) {
            this.id = itemsIdGenerator.next().value;
            this.name = name;
            this.description = description;
        }

        get name() {
            return this._name;
        }

        set name(name) {
            if (!validator.isStringValid(name, MIN_ITEM_NAME_LENGHT, MAX_ITEM_NAME_LENGHT)) {
                throw new Error("Invalid name");
            }

            this._name = name;
        }

        get description() {
            return this._description;
        }

        set description(description) {
            if (!validator.isStringValid(description)) {
                throw new Error("Invalid description");
            }

            this._description = description;
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
            if (!validator.isStringValid(isbn, ISBN_LENGTH_10, ISBN_LENGTH_10) &&
                !validator.isStringValid(isbn, ISBN_LENGTH_13, ISBN_LENGTH_13)) {
                throw new Error("Invalid ISBN");
            }

            this._isbn = isbn;
        }

        get genre() {
            return this._genre;
        }

        set genre(genre) {
            if (!validator.isStringValid(genre, MIN_GENRE_LENGTH, MAX_GENRE_LENGTH)) {
                throw new Error("Invalid genre");
            }

            this._genre = genre;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.rating = rating;
            this.duration = duration;
        }

        get rating() {
            return this._rating;
        }

        set rating(rating) {
            if (!validator.isNumberValid(rating, MIN_RATING, MAX_RATING)) {
                throw new Error("Invalid rating");
            }

            this._rating = rating;
        }

        get duration() {
            return this._duration;
        }

        set duration(duration) {
            if (!validator.isNumberValid(duration, 1)) {
                throw new Error("Invalid duration");
            }

            this._duration = duration;
        }
    }

    let catalogsIdGenerator = idGenerator();

    class Catalog {
        constructor(name) {
            this.id = catalogsIdGenerator.next().value;
            this.name = name;
            this.items = [];
        }

        get name() {
            return this._name;
        }

        set name(name) {
            if (!validator.isStringValid(name, MIN_CATALOG_NAME_LENGHT, MAX_CATALOG_NAME_LENGTH)) {
                throw new Error("Invalid Catalog name");
            }

            this._name = name;
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            if (!validator.isNonEmptyArrayWithValidObjects(items, this._itemLikeObjectValidation)) {
                throw new Error("Invalid items");
            }

            this.items.push(...items);

            return this;
        }

        find(options) {
            if (typeof options === "undefined") {
                throw new Error("Invalid find options");
            }

            let isSingleResult = false;
            if (typeof options === "number") {
                options = {
                    id: options
                };
                isSingleResult = true;
            }

            if (typeof options !== "object") {
                throw new Error("Invalid options");
            }

            let result = this.items.filter(item => {
                return Object.keys(options)
                    .every(key => item[key] === options[key]);
            });

            return (!isSingleResult) ? result : (result.length) ? result[0] : null;
        }

        search(pattern) {
            if (!validator.isStringValid(pattern, MIN_PATTERN_LENGTH)) {
                throw new Error("Invalid pattern");
            }

            pattern = pattern.toLowerCase();

            return this.items.filter(item =>
                item.name.toLowerCase().includes(pattern) ||
                item.description.toLowerCase().includes(pattern));
        }

        _itemLikeObjectValidation(item) {

            return (item instanceof Item) ||
                (typeof item.id === "number" &&
                    typeof item.name === "string" &&
                    typeof item.description === "string");
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        _itemLikeObjectValidation(item) {
            return super._itemLikeObjectValidation(item) &&
                ((item instanceof Book) ||
                    (typeof item.isbn === "string" &&
                        typeof item.genre === "string"));
        }

        getGenres() {
            let genres = {};
            this.items.forEach(item => {
                genres[item.genre] = true;
            });

            return Object.keys(genres);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        getTop(count) {
            if (typeof count !== "number" || count < MIN_GET_TOP_COUNT) {
                throw new Error("Invalid count");
            }
            return this.items.sort((x, y) => x.rating - y.rating)
                .slice(0, count)
                .map(item => {
                    return {
                        id: item.id,
                        name: item.name
                    };
                });
        }

        getSortedByDuration() {
            return [...this.items]
                .sort((x, y) => (0 === y.duration - x.duration) ? y.duration - x.duration : x.id - y.id);
        }

        _itemLikeObjectValidation(item) {

            return super._itemLikeObjectValidation(item) &&
                ((item instanceof Media) ||
                    (typeof item.rating === "number" &&
                        typeof item.duration === "number"));
        }

    }

    function getBook(name, isbn, genre, description) {
        return new Book(name, isbn, genre, description);
    }

    function getMedia(name, rating, duration, description) {
        return new Media(name, rating, duration, description);
    }

    function getBookCatalog(name) {
        return new BookCatalog(name);
    }

    function getMediaCatalog(name) {
        return new MediaCatalog(name);
    }
    return { getBook, getMedia, getBookCatalog, getMediaCatalog };
}
module.exports = solve;