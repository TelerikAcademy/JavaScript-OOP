function solve() {
	function validateName(name) {
		if(typeof name !== 'string' || !name.match(/^([a-zA-Z0-9]|\s){1,24}$/)) {
			throw Error('name is not valid');
		}
	}

	function validateDescription(description) {
		if(typeof description !== 'string') {
			throw Error('description is not valid');
		}
	}

	function validateVersion(version) {
		if(typeof version !== 'number' || !(version > 0) || Number.isNaN(version)) {
			throw Error('version is not valid');
		}
	}

	function validateRating(rating) {
		if(typeof rating !== 'number' || rating < 1 || rating > 10 || Number.isNaN(rating)) {
			throw Error('rating is not valid');
		}
	}

	function validateHostname(hostname) {
		if(typeof hostname !== 'string' || hostname.length < 1 || hostname.length > 32) {
			throw Error('hostname is not valid');
		}
	}

	function copyApp(app) {
		return {
			name: app.name,
			description: app.description,
			version: app.version,
			rating: app.rating,
			apps: app.apps // this is for stores
		};
	}

	class App {
		constructor(name, description, version, rating) {
			validateName(name);
			validateDescription(description);
			validateVersion(version);
			validateRating(rating);

			this._name = name;
			this._description = description;
			this._version = version;
			this._rating = rating;
		}

		get name() {
			return this._name;
		}

		get description() {
			return this._description;
		}

		get version() {
			return this._version;
		}

		get rating() {
			return this._rating;
		}

		release(options) {
			if(typeof options !== 'object') {
				options = {version: options};
			}

			validateVersion(options.version);
			if(!(options.version > this._version)) {
				throw Error('version is not valid'); 
			}
			this._version = options.version;

			if(options.hasOwnProperty('description')) {
				validateDescription(options.description);
				this._description = options.description;
			}

			if(options.hasOwnProperty('rating')) {
				validateRating(options.rating);
				this._rating = options.rating;
			}

			return this;
		}
	}

	class Store extends App {
		constructor(...params) {
			super(...params);
			this._apps = [];
		}

		get apps() {
			return this._apps;
		}

		uploadApp(app) {
			if(!(app instanceof App)) {
				throw Error('Not a valid app');
			}

			const index = this._apps.findIndex(x => x.name === app.name);
			if(index >= 0) {
				this._apps.splice(index, 1);
			}
			this._apps.push(copyApp(app));

			return this;
		}

		takedownApp(name) {
			const index = this._apps.findIndex(x => x.name === name);
			if(index < 0) {
				throw Error('App not found');
			}

			this._apps.splice(index, 1);

			return this;
		}

		search(pattern) {
			pattern = pattern.toLowerCase();

			return (this._apps
				.filter(app => app.name.toLowerCase().indexOf(pattern) >= 0)
				.sort((x, y) => x.name.localeCompare(y.name)));
		}

		listMostRecentApps(count) {
			count = count || 10;

			return this._apps.slice()
				.reverse()
				.slice(0, count);
		}

		listMostPopularApps(count) {
			count = count || 10;

			return this._apps.map((app, index) => ({app, index}))
				.sort((x, y) => {
					if(y.app.rating !== x.app.rating) {
						return y.app.rating - x.app.rating;
					}
					return y.app.index - x.app.index;
				})
				.slice(0, count)
				.map(x => x.app);
		}
	}

	class Device {
		constructor(hostname, apps) {
			validateHostname(hostname);

			if(!Array.isArray(apps)) {
				throw Error('apps must be an array of apps');
			}
			if(!apps.every(x => x instanceof App)) {
				throw Error('There is non-app in the apps array');
			}

			this._hostname = hostname;
			this._apps = apps.map(x => copyApp(x));
			this._stores = apps.filter(x => x instanceof Store).map(x => copyApp(x));
		}

		get hostname() {
			return this._hostname;
		}

		get apps() {
			return this._apps.slice();
		}

		search(pattern) {
			pattern = pattern.toLowerCase();

			const result = {};
			this._stores.forEach(store => {
				store.apps.forEach(x => {
					if(x.name.toLowerCase().indexOf(pattern) < 0) {
						return;
					}
					if(result.hasOwnProperty(x.name) && x.version <= result[x.name].version) {
						return;
					}
					result[x.name] = x;
				});
			});

			// bgcoder does not support Object.values @ the moment (Thu Feb 23 15:35:42 EET 2017)
			return Object.keys(result).sort().map(key => result[key]);
		}

		install(name) {
			let bestApp = {version: -1};
			this._stores.forEach(store => {
				const currApp = store.apps.find(x => x.name === name);
				if(currApp && bestApp.version < currApp.version) {
					bestApp = currApp;
				}
			});

			if(bestApp.version < 0) {
				throw Error('Error app not found');
			}

			if(this._apps.every(x => x.name !== name)) {
				this._apps.push(copyApp(bestApp));
				if(bestApp instanceof Store) {
					this._stores.push(copyApp(bestApp));
				}
			}

			return this;
		}

		uninstall(name) {
			let index = this._apps.findIndex(x => x.name === name);
			if(index < 0) {
				throw Error('App is not installed');
			}
			this._apps.splice(index, 1);

			index = this._stores.findIndex(x => x.name === name);
			if(index >= 0) {
				this._stores.splice(index, 1);
			}

			return this;
		}

		listInstalled() {
			return (this._apps.slice()
				.sort((x, y) => x.name.localeCompare(y.name)));
		}

		update() {
			this._apps = this._apps.map(app => {
				const name = app.name;

				let bestApp = app;
				this._stores.forEach(store => {
					const currApp = store.apps.find(x => x.name === name);
					if(currApp && bestApp.version < currApp.version) {
						bestApp = currApp;
					}
				});

				return bestApp;
			});

			return this;
		}
	}

	return {
		createApp(name, description, version, rating) {
			return new App(name, description, version, rating);
		},
		createStore(name, description, version, rating) {
			return new Store(name, description, version, rating);
		},
		createDevice(hostname, apps) {
			return new Device(hostname, apps);
		}
	};
}

// Submit the code above this line in bgcoder.com
module.exports = solve;
