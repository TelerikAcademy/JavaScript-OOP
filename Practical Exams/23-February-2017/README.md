# App stores

Implement functionality for app stores and devices. Implement the given classes.

## Class descriptions

### `class App`
- Constructor or init method:
  - takes `name`, `description`, `version` and `rating` as parameters
    - **throws** if any of them is not valid
- Properties:
  - `name` - a string with length between 1 and 24 latin letters, numbers and whitespace
  - `description` - a string
  - `version` - a positive number
  - `rating` - a number between 1 and 10
- Methods:
  - `release(version)`
    - changes the version of the app
	- **throws** if the new version is not above the old one
  - `release(options)`
	- `options` is an object with keys:
	  - `version` - **mandatory** - changes the app version
	    - **throws** if the new version is not above the old one
	    - **throws** if the new version is invalid
	    - **throws** if not specified
	  - `description` - **optional** - changes the app description
		- **throws** if `description` is not valid
	  - `rating` - **optional** - changes the app rating
		- **throws** if `rating` is not valid

### `class Store` extends `App`
- The store is also an app
  - has all `App` properties and methods
  - has the `App` constructor
- Properties:
  - `apps` - an array of uploaded apps
- Methods:
  - `uploadApp(app)`
    - `app` must be a valid instance of the `App` class
    - if an app with the same name:
	  - doesn't exist - creates a new app in the Store
	  - does exist - updates the app to the newer version
	    - updates `description` and `rating`
	    - **throws** if the new version is not bigger than the old one
	- **should provide chaining**
  - `takedownApp(name)`
    - removes an app with the given `name` from the store
	  - **throw** if an app with the given name does not exist in the store
	- **should provide chaining**
  - `search(pattern)`
    - performs case-insensitive search in the store
	- returns an array of apps containing `pattern` in their name
    - sort apps lexicographically by name
  - `listMostRecentApps(count)`
    - `count` is an optional parameter
	  - defaults to 10
	- returns an array of the `count` most recent apps
	  - sorted by time of upload - descending
  - `listMostPopularApps(count)`
    - `count` is an optional parameter
	  - defaults to 10
	- returns an array of the `count` most popular apps
	  - sorted by rating - descending
	  - apps with equal rating should be sorted by time of upload - descending

### `class Device`
- Constructor or init method:
  - takes `hostname` and an **array of pre-installed apps** (e.g. default store)
    - **throws** if `hostname` is not valid
	- **throws** if there is an invalid app
- Properties:
  - `hostname`: a string with length between 1 and 32 symbols
  - `apps` - an array of installed apps
- Methods:
  - `search(pattern)`
    - performs case-insensitive search in all stores installed on the device
	- returns an array of apps containing `pattern` in their name
    - sort apps lexicographically by name
	- return only latest versions of apps
  - `install(name)`
    - installs an app with name: `name`
	  - find the most recent version of the app in the installed stores
	- does nothing if the app is already installed
	- **throws** if app `name` is not available in installed stores
	- **should provide chaining**
  - `uninstall(name)`
    - uninstalls the app with name: `name`
	- **throws** if no such app is installed
	- **should provide chaining**
  - `listInstalled()`
    - returns an array of all installed apps
	  - sort apps lexicographically by name
  - `update()`
    - updates all installed apps to their best version across all stores installed on the device
	- **should provide chaining**

## Solution template

```javascript
function solve() {
	// Your classes

	return {
		createApp(name, description, version, rating) {
			// returns a new App object
		},
		createStore(name, description, version, rating) {
			// returns a new Store object
		},
		createDevice(hostname, apps) {
			// returns a new Device object
		}
	};
}

// Submit the code above this line in bgcoder.com
module.exports = solve;
```
