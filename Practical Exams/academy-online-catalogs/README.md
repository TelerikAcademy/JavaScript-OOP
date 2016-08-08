#Academy Online Catalogs

*   Implement a functionality to serve an Academy Online Catalogs
    *   The catalog contains a set of items

## `Item`
has the following:

*   properties
    *   `id`
        *   A **number** unique for all items
        *   Generated at object creation
    *   `description`
        *   A **non-empty** string
        *   Passed as parameter to a constructor or init function
    *   `name`
        *   A string with length **between 2 and 40** characters, inclusive
        *   Passed as parameter to a constructor or init function

## `Book`
has the following:

*   inherits Item
*   properties
    *   isbn 
        *   A string with length **exactly 10 or 13**
        *   Can contain **only digits**
        *   Passed to a constructor or init function
    *   genre
        *   A string with length **between 2 and 20** characters, inclusive
        *   Passed as parameter to a constructor or init function

## `Media`
each has the following:

*   inherits Item
*   properties
    *   duration 
        *   A number greater than 0
        *   Passed as parameter to a constructor or init function
    *   rating
        *   A number between 1 and 5, inclusive
        *   Passed as parameter to a constructor or init function

## `Catalog`
has the following:

*   properties:
    *   id
        *   A **number** unique for all catalogs
        *   Generated at object creation
    *   name
        *   A string with length **between 2 and 40** characters, inclusive
        *   Passed as parameter to a constructor or init function
	*	items
		*	An array where the added items are stored
		*	(this is for testing reasons make a direct reference and do not use `.slice()`)
*   methods:
    *   add(item1, item2, item3, ...)
        *   Add items to this catalog instance
        *   Items can be one or more
		*	This method should enable **chaining**
        *   Throws if:
            *   No items are passed
            *   Any of the items is **not an Item instance** or **not an Item-like object**
            *   **none of the items must be added** in case of error
    *   add(itemsArray)
        *   Add items to this catalog instance
        *   Items are provided as an array
        *   The array can contain one or more items
        *   Throws if:
            *   The array is empty
            *   Any of the items is **not an Item instance** or **not an Item-like object**
            *   **none of the items must be added** in case of error
    *   find(id)
        *   **Returns the left most item** that has the provided `id`
        *   **Returns null** if there is no item with the provided `id`
        *   Throws if:
			*	no arguments are passed
            *   `id` is not a number
    *   find(options)
        *   **Returns an array of items**, that meet the requirements in options
        *   **Returns an empty array**, if no item meets the requirements
        *   The requirements are provided as an `options` object
            *   The `options` object can have keys `id` or/and `name`
            *   Each item that matches all the properties and their values in the `options` object must be returned
            *   __Example:__

                    //having items [{name: 'Samsung Galaxy S2', id: 2}, {name: 'Peralnya Hubava', id: 3}, {name: 'Samsung Galaxy S2', id: 4}]

                    //find({name: 'Samsung Galaxy S2'}) 
                    //returns [{name: 'Samsung Galaxy S2', id: 2}, {name: 'Samsung Galaxy S2', id: 4}]

                    //find({id: 3})
                    //returns [{name: 'Peralnya Hubava', id: 3}]

                    //find({id: 2, name: 'Samsung Galaxy S2'})
                    //returns [{name: 'Samsung Galaxy S2', id: 2}]

                    //find({id: 2, name: 'samsung gaLAxy s2'})
                    //returns [{name: 'Samsung Galaxy S2', id: 2}]

                    //find({id:6}) and find({name: 'Samsung'})
                    //returns []

    *   search(pattern)
        *   **Returns an array of items**
            *   Each item **must contain** the pattern as substring either in its **name** or in its **description**
        *   **Returns an empty array**, if **none of the items** contain the pattern
        *   The `pattern` is a string containing at least 1 character
        *   The search is **case insensitive**

##`BookCatalog`
has the following:

*   inherits Catalog
*   methods:
    *   add(book1, book2, book3, ...)
        *   Extends parent's method        
        *   Adds a throw when:
            *   Any of the books is **not a Book instance** or **not a Book-like object**
            *   **none of the books must be added** in case of error
    *   add(booksArray)
        *   Extends parent's method        
        *   Adds a throw when:
            *   Any of the books is **not a Book instance** or **not a Book-like object**
            *   **none of the items must be added** in case of error
    *   getGenres()
        *   **Returns an array of lowercase strings**
            *   All the unique genres of books that are added
    *   find(options)
        *   Extends find(options) from parent, but adds a key `genre`
            *   i.e. books can be found by `id`, `name` and/or `genre`

## `MediaCatalog`
has the following:

*   inherits Catalog
*   methods:
    *   add(media1, media2, media3, ...)
        *   Extends parent's method        
        *   Adds a throw when:
            *   Any of the media is **not a Media instance** or **not a Media-like object**
            *   **none of the media must be added** in case of error
    *   add(mediaArray)
        *   Extends parent's method        
        *   Adds a throw when:
            *   Any of the media is **not a Media instance** or **not a Media-like object**
            *   **none of the media must be added** in case of error
    *   getTop(count)
        *   **Returns an array with the `id` and `name`** of the top `count` media **sorted by rating**
        *   Throws if
            *   Count is not a number
            *   Count is less than 1
	*	getSortedByDuration
		*	**Returns an array of all the media in the catalog**
		*	The media must sorted by:
			*	descending by duration
			*	ascending by id


##Example:

        function solve(){            
            return {
                getBook: function (name, isbn, genre, description) {
                    //return a book instance
                },
                getMedia: function (name, rating, duration, description) {
                    //return a media instance
                }
                getBookCatalog: function (name) {
                    //return a book catalog instance
                },
                getMediaCatalog: function (name) {
                    //return a media catalog instance
                }
            };