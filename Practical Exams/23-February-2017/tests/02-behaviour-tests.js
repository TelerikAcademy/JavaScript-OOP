const {expect} = require('chai');
const result = require('../task/task')();

describe('Behaviour tests', function() {
	describe('App methods tests', function() {
		describe('release()', function() {
			it('expect releasing new App version to change only app version', function() {
				const app = result.createApp('app', 'description', 0.1, 7);
				app.release(0.2);

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);
			});

			it('expect releasing old App version or invalid version to throw', function() {
				const app = result.createApp('app', 'description', 0.2, 4);
				expect(app.release).to.be.a('function');
				expect(() => app.release(0.1)).to.throw();
				expect(() => app.release(0.2)).to.throw();
				expect(() => app.release('I like trains')).to.throw();
			});

			it('expect releasing new App version as options object to change only app version', function() {
				const app = result.createApp('app', 'description', 0.1, 7);
				app.release({version: 0.2});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);
			});

			it('expect releasing new App version as options object to change only specified properties', function() {
				let app = result.createApp('app', 'description', 0.1, 7);
				app.release({version: 0.2, description: 'desc2'});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('desc2');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);

				app = result.createApp('app', 'description', 0.1, 7);
				app.release({version: 0.2, rating: 1});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(1);

				app = result.createApp('app', 'description', 0.1, 7);
				app.release({version: 0.2, description: 'desc2', rating: 1});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('desc2');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(1);
			});

			it('expect releasing invalid version as options object to throw', function() {
				const app = result.createApp('app', 'description', 0.2, 8);
				expect(app.release).to.be.a('function');
				expect(() => app.release({})).to.throw();
				expect(() => app.release({works: true})).to.throw();
				expect(() => app.release({version: 0.1})).to.throw();
				expect(() => app.release({version: 0.2})).to.throw();
				expect(() => app.release({version: '!!'})).to.throw();
			});

			it('expect releasing invalid version as options object to throw', function() {
				let app = result.createApp('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: {}})).to.throw();

				app = result.createApp('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, rating: 149})).to.throw();

				app = result.createApp('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: 'desc2', rating: 149})).to.throw();

				app = result.createApp('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: [], rating: 1})).to.throw();
			});

			it('expect App.release() to provide chaining', function() {
				const app = result.createApp('app', 'description', 1, 3);
				expect(app.release(2)).to.equal(app); // reference equal
				expect(app.release({version: 3})).to.equal(app); // reference equal
			});
		});
	});

	describe('Store methods tests', function() {
		describe('release()', function() {
			it('expect releasing new Store version to change only app version', function() {
				const app = result.createStore('app', 'description', 0.1, 7);
				app.release(0.2);

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);
			});

			it('expect releasing old Store version or invalid version to throw', function() {
				const app = result.createStore('app', 'description', 0.2, 9);
				expect(app.release).to.be.a('function');
				expect(() => app.release(0.1)).to.throw();
				expect(() => app.release(0.2)).to.throw();
				expect(() => app.release('I like trains')).to.throw();
			});

			it('expect releasing new Store version as options object to change only app version', function() {
				const app = result.createStore('app', 'description', 0.1, 7);
				app.release({version: 0.2});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);
			});

			it('expect releasing new Store version as options object to change only specified properties', function() {
				let app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				app.release({version: 0.2, description: 'desc2'});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('desc2');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(7);

				app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				app.release({version: 0.2, rating: 1});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(1);

				app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				app.release({version: 0.2, description: 'desc2', rating: 1});

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('desc2');
				expect(app.version).to.equal(0.2);
				expect(app.rating).to.equal(1);
			});

			it('expect releasing invalid version as options object to throw', function() {
				const app = result.createStore('app', 'description', 0.2, 8);
				expect(app.release).to.be.a('function');
				expect(() => app.release({})).to.throw();
				expect(() => app.release({works: true})).to.throw();
				expect(() => app.release({version: 0.1})).to.throw();
				expect(() => app.release({version: 0.2})).to.throw();
				expect(() => app.release({version: '!!'})).to.throw();
			});

			it('expect releasing invalid version as options object to throw', function() {
				let app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: {}})).to.throw();

				app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, rating: 149})).to.throw();

				app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: 'desc2', rating: 149})).to.throw();

				app = result.createStore('app', 'description', 0.1, 7);
				expect(app.release).to.be.a('function');
				expect(() => app.release({version: 0.2, description: [], rating: 1})).to.throw();
			});

			it('expect Store.release() to provide chaining', function() {
				const app = result.createStore('app', 'description', 1, 3);
				expect(app.release(2)).to.equal(app); // reference equal
				expect(app.release({version: 3})).to.equal(app); // reference equal
			});
		});

		describe('uploadApp()', function() {
			it('expect uploadApp() to throw when an invalid app is provided', function() {
				const store = result.createStore('store', 'description', 1, 1);
				expect(store.uploadApp).to.be.a('function');
				expect(() => store.uploadApp()).to.throw();
				expect(() => store.uploadApp(42)).to.throw();
				expect(() => store.uploadApp('push')).to.throw();
				expect(() => store.uploadApp([1, 2, 3])).to.throw();
				expect(() => store.uploadApp({})).to.throw();
				expect(() => store.uploadApp({works: true})).to.throw();
			});

			it('expect uploadApp() to put an app in the store', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app', 'description of an app', 2, 3);
				store.uploadApp(app);
				expect(store.apps).to.have.length(1);
				expect(store.apps[0].name).to.equal(app.name);
				expect(store.apps[0].description).to.equal(app.description);
				expect(store.apps[0].version).to.equal(app.version);
				expect(store.apps[0].rating).to.equal(app.rating);
			});

			it('expect uploadApp() to put apps with different name in the store', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app1 = result.createApp('app1', 'description of an app', 5, 6);
				const app2 = result.createApp('app2', 'description of an app 2', 7, 8);

				store.uploadApp(app1);
				store.uploadApp(app2);

				expect(store.apps).to.have.length(2);

				const apps = store.apps.slice();
				const i = (apps[0].name === app1.name ? 0 : 1);

				expect(apps[i].name).to.equal(app1.name);
				expect(apps[i].description).to.equal(app1.description);
				expect(apps[i].version).to.equal(app1.version);
				expect(apps[i].rating).to.equal(app1.rating);

				expect(apps[1 - i].name).to.equal(app2.name);
				expect(apps[1 - i].description).to.equal(app2.description);
				expect(apps[1 - i].version).to.equal(app2.version);
				expect(apps[1 - i].rating).to.equal(app2.rating);
			});

			it('expect uploadApp() to upload new version of apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);

				store.uploadApp(app);
				app.release(7);
				store.uploadApp(app);

				expect(store.apps).to.have.length(1);
				expect(store.apps[0].name).to.equal(app.name);
				expect(store.apps[0].description).to.equal(app.description);
				expect(store.apps[0].version).to.equal(app.version);
				expect(store.apps[0].rating).to.equal(app.rating);
			});

			it('expect uploadApp() to upload new version of apps and change description and/or rating', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);

				store.uploadApp(app);

				app.release({version: 10, description: 'i want to sleep'});
				store.uploadApp(app);

				expect(store.apps).to.have.length(1);
				expect(store.apps[0].name).to.equal(app.name);
				expect(store.apps[0].description).to.equal(app.description);
				expect(store.apps[0].version).to.equal(app.version);
				expect(store.apps[0].rating).to.equal(app.rating);

				app.release({version: 11, rating: 2});
				store.uploadApp(app);

				expect(store.apps).to.have.length(1);
				expect(store.apps[0].name).to.equal(app.name);
				expect(store.apps[0].description).to.equal(app.description);
				expect(store.apps[0].version).to.equal(app.version);
				expect(store.apps[0].rating).to.equal(app.rating);

				app.release({version: 12, description: 'djidjibidji', rating: 9});
				store.uploadApp(app);

				expect(store.apps).to.have.length(1);
				expect(store.apps[0].name).to.equal(app.name);
				expect(store.apps[0].description).to.equal(app.description);
				expect(store.apps[0].version).to.equal(app.version);
				expect(store.apps[0].rating).to.equal(app.rating);
			});

			it('expect new releases of an app to not be implicitly uploaded in the store', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);

				store.uploadApp(app);
				app.release(10);

				expect(store.apps).to.have.length(1);
				expect(store.apps[0].version).to.equal(5);
			});

			it('expect uploadApp() to provide chaining', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				expect(store.uploadApp(app)).to.equal(store); // equal by reference
			});
		});

		describe('takedownApp()', function() {
			it('expect takedownApp() to remove added app', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);

				store.uploadApp(app);
				store.takedownApp(app.name);

				expect(store.apps).to.be.empty;
			});

			it('expect takedownApp() to remove only the added app', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('app' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));
				store.takedownApp(apps[4].name);

				apps.splice(4, 1);
				expect(store.apps).to.have.length(apps.length);

				expect(store.apps.map(x => x.name).sort()).to.eql(apps.map(x => x.name).sort()); // deep equal
			});

			it('expect takedownApp() to throw when no such app is found', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('app' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));
				expect(() => store.takedownApp('Goshozavar')).to.throw();
			});

			it('expect takedownApp() to provide chaining', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);

				store.uploadApp(app);
				expect(store.takedownApp(app.name)).to.equal(store); // equal by reference
			});
		});

		describe('search()', function() {
			it('expect search() to return only matching apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const actualNames = store.search('mat1').map(x => x.name);
				const expectedNames = apps.map(x => x.name).filter(x => x.indexOf('mat1') >= 0).sort();

				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect search() to return only matching apps (case insensitive)', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('StamAt' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const actualNames = store.search('MaT1').map(x => x.name);
				const expectedNames = apps.map(x => x.name).filter(x => x.indexOf('mAt1') >= 0).sort();

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
		});

		describe('listMostRecentApps()', function() {
			it('expect listMostRecentApps() to return count most recent apps when count is provided', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const actualNames = store.listMostRecentApps(3).map(x => x.name);
				const expectedNames = apps.map(x => x.name).reverse().slice(0, 3);

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
			it('expect listMostRecentApps() to return 10 most recent apps when count is not provided', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const actualNames = store.listMostRecentApps().map(x => x.name);
				const expectedNames = apps.map(x => x.name).reverse().slice(0, 10);

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
			it('expect listMostRecentApps() to return most recent apps when apps have been updated', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));
				apps.forEach((app, i) => {
					if(i >= 7) return;
					app.release(42);
					store.uploadApp(app);
				});

				const actualNames = store.listMostRecentApps(3).map(x => x.name);
				const expectedNames = apps.map(x => x.name).slice(4, 7).reverse();

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
		});

		describe('listMostPopularApps()', function() {
			it('expect listMostRecentApps() to return count most popular apps when count is provided', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 7})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 9 - i));

				apps.forEach(app => store.uploadApp(app));

				const actualNames = store.listMostPopularApps(3).map(x => x.name);
				const expectedNames = apps.map(x => x.name).slice(0, 3);

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
			it('expect listMostRecentApps() to return most popular apps, sorted correctly when there are equal ratings', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));
				apps[3].release(42);
				apps[7].release(42);
				apps[13].release(42);

				store.uploadApp(apps[7]);
				store.uploadApp(apps[13]);
				store.uploadApp(apps[3]);

				const actualNames = store.listMostRecentApps(3).map(x => x.name);
				const expectedNames = [apps[3].name, apps[13].name, apps[7].name];

				expect(actualNames).to.eql(expectedNames); // deep equal
			});
		});
	});

	describe('Device methods tests', function() {
		describe('search()', function() {
			it('expect search() to find only matching apps when a single store is installed', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('Stamat' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const device = result.createDevice('Zelka', [store]);

				const actualNames = device.search('mat1').map(x => x.name);
				const expectedNames = apps.map(x => x.name).filter(x => x.indexOf('mat1') >= 0).sort();

				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect search() to find only matching apps when a single store is installed (case insensitive)', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('StaMaT' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const device = result.createDevice('Zelka', [store]);

				const actualNames = device.search('mAt1').map(x => x.name);
				const expectedNames = apps.map(x => x.name).filter(x => x.indexOf('MaT1') >= 0).sort();

				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect search() to find no matching apps when no store is installed', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const apps = Array.from({length: 17})
					.map((_, i) => result.createApp('StaMaT' + i, 'description of an app', 5, 6));

				apps.forEach(app => store.uploadApp(app));

				const device = result.createDevice('Zelka', apps);

				expect(device.search('mat1')).to.be.empty;
			});

			it('expect search() to find only the newest versions of apps when several stores are installed', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const store2 = result.createStore('store beta', 'description', 1, 4);
				const apps = Array.from({length: 4})
					.map((_, i) => result.createApp('Stamat' + (i + 9), 'description of an app', 5, 6));
					// 9 10 11 12

					store.uploadApp(apps[0]).uploadApp(apps[1]).uploadApp(apps[2]);
					apps[1].release(9);
					store2.uploadApp(apps[0]).uploadApp(apps[1]).uploadApp(apps[3]);

				const device = result.createDevice('Zelka', [store, store2]);

				const actual = device.search('mat1');
				const expectedNames = [10, 11, 12].map(x => 'Stamat' + x);
				expect(actual.map(x => x.name)).to.eql(expectedNames);
				expect(actual.map(x => x.version)).to.eql([9, 5, 5]);
			});
		});

		describe('install()', function() {
			it('expect install() to install an app', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				store.uploadApp(app);

				const device = result.createDevice('Zelka', [store]);
				expect(device.apps).to.have.length(1);

				device.install(app.name);

				const actualNames = device.apps.map(x => x.name).sort();
				const expectedNames = [store.name, app.name].sort();
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect install() to install multiple apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				const app2 = result.createApp('app2', 'description of an app', 5, 6);
				store.uploadApp(app).uploadApp(app2);

				const device = result.createDevice('Zelka', [store]);
				expect(device.apps).to.have.length(1);

				device.install(app.name);
				device.install(app2.name);

				const actualNames = device.apps.map(x => x.name).sort();
				const expectedNames = [store.name, app.name, app2.name].sort();
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect install() to install apps from all available stores', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const store2 = result.createStore('store2', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				const app2 = result.createApp('app2', 'description of an app', 5, 6);
				store.uploadApp(app);
				store2.uploadApp(app2);

				const device = result.createDevice('Zelka', [store, store2]);
				expect(device.apps).to.have.length(2);

				device.install(app.name);
				device.install(app2.name);

				const actualNames = device.apps.map(x => x.name).sort();
				const expectedNames = [store.name, store2.name, app.name, app2.name].sort();
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect install() to install the newest version of the app in the installed stores', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const store2 = result.createStore('store2', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				store.uploadApp(app);
				app.release(7);
				store2.uploadApp(app);

				const device = result.createDevice('Zelka', [store, store2]);
				expect(device.apps).to.have.length(2);

				device.install(app.name);

				const actualVersions = device.apps.map(x => x.version).sort();
				expect(actualVersions).to.eql([1, 1, 7]); // deep equal
			});

			it('expect install()-ing multiple times an existing app to not change it', function() {
				const store = result.createStore('store', 'description', 1, 4);
				store.uploadApp(store);

				const device = result.createDevice('Zelka', [store]);
				expect(device.apps).to.have.length(1);

				device.install(store.name);
				device.install(store.name);
				device.install(store.name);

				expect(device.apps).to.have.length(1);
			});

			it('expect install() to throw when app with the provided name does not exist in installed stores', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				store.uploadApp(app);

				const device = result.createDevice('Zelka', [store]);

				expect(device.install).to.be.a('function');
				expect(() => device.install('Motika')).to.throw();
			});

			it('expect install() to provide chaining', function() {
				const store = result.createStore('store', 'description', 1, 4);
				store.uploadApp(store);

				const device = result.createDevice('Zelka', [store]);
				expect(device.install(store.name)).to.equal(device); // reference equal
			});
		});

		describe('uninstall()', function() {
			it('expect uninstall() to remove only the installed app with specified name', function() {
				const app = result.createApp('app', 'description', 1, 4);
				const app2 = result.createApp('app2', 'description', 1, 4);
				const device = result.createDevice('Zelka', [app, app2]);

				device.uninstall(app.name);

				const actualNames = device.apps.map(x => x.name);
				const expectedNames = [app2.name];
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect uninstall() to throw when app with the specified name is not installed', function() {
				const app = result.createApp('store', 'description', 1, 4);
				const device = result.createDevice('Zelka', [app]);
				expect(device.uninstall).to.be.a('function');
				expect(() => device.uninstall('temenujka')).to.throw();
			});

			it('expect uninstall() to provide chaining', function() {
				const app = result.createStore('app', 'description', 1, 4);
				const device = result.createDevice('Zelka', [app]);
				expect(device.uninstall(app.name)).to.equal(device); // reference equal
			});
		});

		describe('listInstalled()', function() {
			it('expect listInstalled() to list single one app when only one app is preinstalled', function() {
				const app = result.createApp('app1', 'description of an app', 5, 6);

				const device = result.createDevice('Zelka', [app]);

				expect(device.listInstalled().map(x => x.name)).to.eql([app.name]); // deep equal
			});

			it('expect listInstalled() to list all pre-installed apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				const app2 = result.createApp('app2', 'description of an app', 5, 6);
				store.uploadApp(app).uploadApp(app2);

				const device = result.createDevice('Zelka', [store, app, app2]);

				const actualNames = device.listInstalled().map(x => x.name);
				const expectedNames = [store.name, app.name, app2.name].sort();
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect listInstalled() to list all installed apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				const app2 = result.createApp('app2', 'description of an app', 5, 6);
				store.uploadApp(app).uploadApp(app2);

				const device = result.createDevice('Zelka', [store]);
				device.install(app.name).install(app2.name);

				const actualNames = device.listInstalled().map(x => x.name);
				const expectedNames = [store.name, app.name, app2.name].sort();
				expect(actualNames).to.eql(expectedNames); // deep equal
			});

			it('expect listInstalled() to return the newest versions of installed apps', function() {
				const store = result.createStore('store', 'description', 1, 4);
				const store2 = result.createStore('store2', 'description', 1, 4);
				const app = result.createApp('app1', 'description of an app', 5, 6);
				store.uploadApp(app);
				app.release(7);
				store2.uploadApp(app);

				const device = result.createDevice('Zelka', [store, store2]);

				device.install(app.name);

				const actualVersions = device.listInstalled().map(x => x.version).sort();
				expect(actualVersions).to.eql([1, 1, 7]); // deep equal
			});

			it('expect listInstalled() after installing multiple times an existing app to return a single app', function() {
				const store = result.createStore('store', 'description', 1, 4);
				store.uploadApp(store);

				const device = result.createDevice('Zelka', [store]);
				expect(device.apps).to.have.length(1);

				device.install(store.name);
				device.install(store.name);
				device.install(store.name);

				expect(device.listInstalled()).to.have.length(1);
			});

			it('expect listInstalled() to not return uninstalled apps', function() {
				const app = result.createApp('app', 'description', 1, 4);
				const app2 = result.createApp('app2', 'description', 1, 4);
				const device = result.createDevice('Zelka', [app, app2]);

				device.uninstall(app.name);

				const actualNames = device.listInstalled().map(x => x.name);
				const expectedNames = [app2.name];
				expect(actualNames).to.eql(expectedNames); // deep equal
			});
		});

		describe('update()', function() {
			it('expect update() to update installed apps to newest versions available in stores installed on the device', function() {
				const app1 = result.createApp('app1', 'description', 1, 4);
				const app2 = result.createApp('app2', 'description', 2, 4);
				const app3 = result.createApp('app3', 'description', 3, 4);
				const app4 = result.createApp('app4', 'description', 4, 4);

				const store1 = result.createStore('store1', 'description', 1.1, 7);
				const store2 = result.createStore('store2', 'description', 1.2, 7);

				store1.uploadApp(app1).uploadApp(app3);
				store2.uploadApp(app1).uploadApp(app2);

				app2.release(2.3);

				const device = result.createDevice('Zelka', [store1, store2, app1, app2, app3, app4]);

				app2.release(2.4);

				app1.release(1.7);
				store1.uploadApp(app1);

				app3.release(3.3);
				store1.uploadApp(app3);
				app3.release(3.4);
				store2.uploadApp(app3);

				device.update();

				const actualVersions = device.apps.map(x => x.version).sort();
				const expectedVersions = [1.1, 1.2, 1.7, 2.3, 3.4, 4];

				expect(actualVersions).to.eql(expectedVersions); // deep equal
			});

			it('expect update() to provide chaining', function() {
				const device = result.createDevice('Zelka', []);
				expect(device.update()).to.equal(device); // reference equal
			});
		});
	});
});
