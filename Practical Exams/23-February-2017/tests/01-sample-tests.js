const {expect} = require('chai');
const result = require('../task/task')();

describe('Sample tests', function() {
	describe('Solution template tests', function() {
		it('expect createApp to be a function with 4 parameters', function() {
			expect(result.createApp).to.exist;
			expect(result.createApp).to.be.a('function');
			expect(result.createApp).to.have.length(4);
		});
		it('expect createStore to be a function with 4 parameters', function() {
			expect(result.createStore).to.exist;
			expect(result.createStore).to.be.a('function');
			expect(result.createStore).to.have.length(4);
		});
		it('expect createDevice to be a function with 2 parameters', function() {
			expect(result.createDevice).to.exist;
			expect(result.createDevice).to.be.a('function');
			expect(result.createDevice).to.have.length(2);
		});
	});

	describe('Constructor tests', function() {
		describe('App tests', function() {
			it('expect createApp() with invalid name to throw', function() {
				expect(() => result.createApp(0, 'description', 0.1, 4)).to.throw();
				expect(() => result.createApp('', 'description', 0.1, 4)).to.throw();
				expect(() => result.createApp('1234567890123456789012345', 'description', 0.1, 4)).to.throw();
				expect(() => result.createApp('+++', 'description', 0.1, 4)).to.throw();
			});

			it('expect createApp() with invalid description to throw', function() {
				expect(() => result.createApp('app', 0, 0.1, 4)).to.throw();
			});

			it('expect createApp() with invalid version to throw', function() {
				expect(() => result.createApp('app', 'description', 'version', 2)).to.throw();
				expect(() => result.createApp('app', 'description', -5, 4)).to.throw();
			});

			it('expect createApp() with non-number for rating to throw', function() {
				expect(() => result.createApp('app', 'description', 5, 'aresva mi')).to.throw();
				expect(() => result.createApp('app', 'description', 5, -2)).to.throw();
				expect(() => result.createApp('app', 'description', 5, 11)).to.throw();
			});

			it('expect App object to have valid properties', function() {
				const app = result.createApp('app', 'description', 1, 4);

				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(1);
				expect(app.rating).to.equal(4);
			});

			it('expect App object to have all of its methods', function() {
				const app = result.createApp('app', 'description', 1, 4);

				expect(app.release).to.be.a('function');
				expect(app.release).to.have.length(1);
			});
		});

		describe('Store tests', function() {
			it('expect createStore() with invalid name to throw', function() {
				expect(() => result.createStore(0, 'description', 0.1, 4)).to.throw();
				expect(() => result.createStore('', 'description', 0.1, 4)).to.throw();
				expect(() => result.createStore('1234567890123456789012345', 'description', 0.1, 4)).to.throw();
				expect(() => result.createStore('+++', 'description', 0.1, 4)).to.throw();
			});

			it('expect createStore() with invalid description to throw', function() {
				expect(() => result.createStore('app', 0, 0.1, 4)).to.throw();
			});

			it('expect createStore() with invalid version to throw', function() {
				expect(() => result.createStore('app', 'description', 'version', 2)).to.throw();
				expect(() => result.createStore('app', 'description', -5, 4)).to.throw();
			});

			it('expect createStore() with non-number for rating to throw', function() {
				expect(() => result.createStore('app', 'description', 5, 'aresva mi')).to.throw();
				expect(() => result.createStore('app', 'description', 5, -2)).to.throw();
				expect(() => result.createStore('app', 'description', 5, 11)).to.throw();
			});

			it('expect Store object to have valid properties', function() {
				const app = result.createStore('app', 'description', 1, 4);
				expect(app.name).to.equal('app');
				expect(app.description).to.equal('description');
				expect(app.version).to.equal(1);
				expect(app.rating).to.equal(4);

				expect(app.apps).to.be.eql([]);
			});

			it('expect Store object to have all of its methods', function() {
				const app = result.createStore('app', 'description', 1, 4);

				expect(app.release).to.be.a('function');
				expect(app.release).to.have.length(1);

				expect(app.uploadApp).to.be.a('function');
				expect(app.uploadApp).to.have.length(1);

				expect(app.takedownApp).to.be.a('function');
				expect(app.takedownApp).to.have.length(1);

				expect(app.search).to.be.a('function');
				expect(app.search).to.have.length(1);

				expect(app.listMostRecentApps).to.be.a('function');
				expect(app.listMostRecentApps).to.have.length(1);

				expect(app.listMostPopularApps).to.be.a('function');
				expect(app.listMostPopularApps).to.have.length(1);
			});
		});

		describe('Device tests', function() {
			it('expect createDevice() with invalid hostname to throw', function() {
				expect(() => result.createDevice(42, [])).to.throw();
				expect(() => result.createDevice('', [])).to.throw();
				expect(() => result.createDevice('123456789012345678901234567890123', [])).to.throw();
			});

			it('expect createDevice() with invalid app to throw', function() {
				expect(() => result.createDevice('pesho', 7)).to.throw();
				expect(() => result.createDevice('pesho', [7])).to.throw();
				expect(() => result.createDevice('pesho', ['gosho'])).to.throw();
				expect(() => result.createDevice('pesho', [{name: 'gosho'}])).to.throw();

				const app = result.createApp('app', 'description', 1, 1);
				expect(() => result.createDevice('pesho', [app, {name: 'gosho'}])).to.throw();
				expect(() => result.createDevice('pesho', [{name: 'gosho'}, app])).to.throw();
			});

			it('expect Device object to have valid properties', function() {
				const app = result.createDevice('Peshoo', []);

				expect(app.hostname).to.equal('Peshoo');

				expect(app.apps).to.be.eql([]);
			});

			it('expect Device object to have all of its methods', function() {
				const device = result.createDevice('Peshoo', []);

				expect(device.search).to.be.a('function');
				expect(device.search).to.have.length(1);

				expect(device.install).to.be.a('function');
				expect(device.install).to.have.length(1);

				expect(device.uninstall).to.be.a('function');
				expect(device.uninstall).to.have.length(1);

				expect(device.listInstalled).to.be.a('function');
				expect(device.listInstalled).to.have.length(0);

				expect(device.update).to.be.a('function');
				expect(device.update).to.have.length(0);
			});
		});
	});
});
