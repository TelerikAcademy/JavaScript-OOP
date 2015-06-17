/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var lastCategoryId = 0,
			lastBookId = 0,
			books = {
				bycategory: {

				},
				byauthor: {},
				all: []
			},
			generate = {
				nextBookId: function () {
					return lastBookId += 1;
				},
				nextCategoryId: function () {
					return lastCategoryId += 1;
				}
			};
		function loadOrCreate(propName, name) {
			propName = 'by' + propName;
			if (!(books[propName].hasOwnProperty(name))) {
				books[propName][name] = [];
			}
			return books[propName][name];
		}
		
		function validateBook(book){
			
		}

		function listBooks() {

		}

		function addBook(book) {
			validateBook(book);
			book.id = generate.nextBookId();
			var category = loadOrCreate('category', book.category),
				author = loadOrCreate('author', book.author)
			category.push(book);
			author.push(book);
			books.all.push(book);
			return book;
		}

		function listCategories() {

		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
