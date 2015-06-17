/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	Add new category
				*	Each category has a unique name 
				*	It must return the newly created category with assigned ID
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than 1
			*	When adding a book/category, the is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title, Category name, and Book ISBN
				* Book authors can be repeated
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		function listBooks() {

		}

		function addBook() {

		}

		function listCategories() {

		}

		function addCategory() {

		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories,
				add: addCategory
			}
		};
	} ());
	return library;
}
module.exports = solve;
