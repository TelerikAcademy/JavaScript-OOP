Closures and Scopes
==================================

### Task 1.

*	Create a module for working with books
	*	The module must provide the following functionalities:
		*	Add a new book to category
			*	Each book has unique name, author and ISBN
		*	List all books
			*	Books are sorted by ID
			*	This can be done by author, by category or all
		*	Add new category
			*	Each category has a unique name 
		*	List all categories
			*	Categories are sorted by ID
	*	Each book/catagory has a unique identifier (ID) that is a number greater than 1
		*	When adding a book/category, the is generated automatically
	*	Add validation everywhere, where possible
		*	Book and category names must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
		*	Unique params are Book name, Category name, and Book ISBN
			* Book authors can be repeated
		*	If something is not valid - throw Error