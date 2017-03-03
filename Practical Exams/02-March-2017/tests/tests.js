const {expect} = require('chai');
const result = require('../task/task')();

describe('Tests', function() {
	it('Sample test', function() {
		expect(result.getSmartPhone).to.be.a('function');
		expect(result.getSmartPhone).to.have.length(5);

		expect(result.getCharger).to.be.a('function');
		expect(result.getCharger).to.have.length(5);

		expect(result.getRouter).to.be.a('function');
		expect(result.getRouter).to.have.length(5);

		expect(result.getHeadphones).to.be.a('function');
		expect(result.getHeadphones).to.have.length(5);

		expect(result.getHardwareStore).to.be.a('function');
		expect(result.getHardwareStore).to.have.length(1);

		const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		const charger = result.getCharger('Pesho', 'Gosho', 20, 19, 1000);
		const router = result.getRouter('Gosho', 'Pesho', 80, 30, 5);
		const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false);

		[ phone, charger, router, headphones ]
			.forEach(d => {
				[ 'id', 'manufacturer', 'model', 'price', 'getLabel' ]
					.forEach(p => expect(d).to.have.property(p));

				expect(d.getLabel).to.be.a('function');
				expect(d.getLabel).to.have.length(0);
			});

		expect(phone).to.have.property('screenSize');
		expect(phone).to.have.property('operatingSystem');

		expect(charger).to.have.property('outputVoltage');
		expect(charger).to.have.property('outputCurrent');

		expect(router).to.have.property('wifiRange');
		expect(router).to.have.property('lanPorts');

		expect(headphones).to.have.property('quality');
		expect(headphones).to.have.property('hasMicrophone');

		const store = result.getHardwareStore('Technomarket');
		
		expect(store).to.have.property('name');

		[ 'stock', 'sell', 'getSold', 'search' ]
			.forEach(p => {
				expect(store).to.have.property(p);
				expect(store[p]).to.be.a('function');
			});
	});

	it('Test #1', function() {
		// SmartPhone validations

		expect(() => result.getSmartPhone([], 'One M8', 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone({}, 'One M8', 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone(42, 'One M8', 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('', 'One M8', 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('abcdefgabcdefgabcdefg', 'One M8', 42, 5, 'Android')).to.throw();

		expect(() => result.getSmartPhone('HTC', [], 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', {}, 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 42, 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', '', 42, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'abcdefgabcdefgabcdefg', 42, 5, 'Android')).to.throw();

		expect(() => result.getSmartPhone('HTC', 'One M8', 'price', 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', -1, 5, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 0, 5, 'Android')).to.throw();

		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 'price', 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, -1, 'Android')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 0, 'Android')).to.throw();

		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 5, [])).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 5, {})).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 5, 11)).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 5, '')).to.throw();
		expect(() => result.getSmartPhone('HTC', 'One M8', 42, 5, 'xxxxxxxxxxx')).to.throw();

		const device = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		expect(device).to.have.property('id');
		expect(device.manufacturer).to.equal('HTC');
		expect(device.model).to.equal('One M8');
		expect(device.price).to.equal(42);
		expect(device.screenSize).to.equal(5);
		expect(device.operatingSystem).to.equal('Android');
	});

	it('Test #2', function() {
		// Charger validations

		expect(() => result.getCharger([], 'Standard', 42, 19, 2000)).to.throw();
		expect(() => result.getCharger({}, 'Standard', 42, 19, 2000)).to.throw();
		expect(() => result.getCharger(42, 'Standard', 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('', 'Standard', 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('abcdefgabcdefgabcdefg', 'One M8', 42, 19, 2000)).to.throw();

		expect(() => result.getCharger('HTC', [], 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', {}, 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', 42, 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', '', 42, 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', 'abcdefgabcdefgabcdefg', 42, 19, 2000)).to.throw();

		expect(() => result.getCharger('HTC', 'Standard', 'price', 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', -1, 19, 2000)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 0, 19, 2000)).to.throw();

		expect(() => result.getCharger('HTC', 'Standard', 42, 'price', 2000)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, -1, 2000)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 0, 2000)).to.throw();

		expect(() => result.getCharger('HTC', 'Standard', 42, 19, [])).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, {})).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, -1)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, 0)).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, '')).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, 'pesho')).to.throw();
		expect(() => result.getCharger('HTC', 'Standard', 42, 19, 'xxxxxxxxxxx')).to.throw();

		const device = result.getCharger('HTC', 'Standard', 42, 19, 2000);
		expect(device).to.have.property('id');
		expect(device.manufacturer).to.equal('HTC');
		expect(device.model).to.equal('Standard');
		expect(device.price).to.equal(42);
		expect(device.outputVoltage).to.equal(19);
		expect(device.outputCurrent).to.equal(2000);
	});

	it('Test #3', function() {
		// Router validations

		expect(() => result.getRouter([], 'E2000', 42, 30, 4)).to.throw();
		expect(() => result.getRouter({}, 'E2000', 42, 30, 4)).to.throw();
		expect(() => result.getRouter(42, 'E2000', 42, 30, 4)).to.throw();
		expect(() => result.getRouter('', 'E2000', 42, 30, 4)).to.throw();
		expect(() => result.getRouter('abcdefgabcdefgabcdefg', 'One M8', 42, 30, 4)).to.throw();

		expect(() => result.getRouter('Linksys', [], 42, 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', {}, 42, 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', 42, 42, 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', '', 42, 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', 'abcdefgabcdefgabcdefg', 42, 30, 4)).to.throw();

		expect(() => result.getRouter('Linksys', 'E2000', 'price', 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', -1, 30, 4)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 0, 30, 4)).to.throw();

		expect(() => result.getRouter('Linksys', 'E2000', 42, 'price', 4)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, -1, 4)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 0, 4)).to.throw();

		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, [])).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, {})).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, '')).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, 'pesho')).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, 'xxxxxxxxxxx')).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, -1)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, 0)).to.throw();
		expect(() => result.getRouter('Linksys', 'E2000', 42, 30, 4.2)).to.throw();

		const device = result.getRouter('Linksys', 'E2000', 42, 30, 4);
		expect(device).to.have.property('id');
		expect(device.manufacturer).to.equal('Linksys');
		expect(device.model).to.equal('E2000');
		expect(device.price).to.equal(42);
		expect(device.wifiRange).to.equal(30);
		expect(device.lanPorts).to.equal(4);
	});

	it('Test #4', function() {
		// Headphones validations

		expect(() => result.getHeadphones([], 'HD 598', 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones({}, 'HD 598', 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones(42, 'HD 598', 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('', 'HD 598', 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('abcdefgabcdefgabcdefg', 'One M8', 42, 'mid', true)).to.throw();

		expect(() => result.getHeadphones('Sennheiser', [], 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', {}, 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 42, 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', '', 42, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'abcdefgabcdefgabcdefg', 42, 'mid', true)).to.throw();

		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 'price', 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', -1, 'mid', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 0, 'mid', true)).to.throw();

		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'price', true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, [], true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, {}, true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, -1, true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 0, true)).to.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 2, true)).to.throw();

		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', [])).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', {})).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', '')).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', 'pesho')).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', 'xxxxxxxxxxx')).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', -1)).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', 0)).to.not.throw();
		expect(() => result.getHeadphones('Sennheiser', 'HD 598', 42, 'mid', 4.2)).to.not.throw();

		const device = result.getHeadphones('Sennheiser', 'HD 598', 42, 'low', '');
		expect(device).to.have.property('id');
		expect(device.manufacturer).to.equal('Sennheiser');
		expect(device.model).to.equal('HD 598');
		expect(device.price).to.equal(42);
		expect(device.quality).to.equal('low');
		expect(device.hasMicrophone).to.be.false;
	});

	it('Test #5', function() {
		// Device.getLabel

		const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		expect(phone.getLabel()).to.equal('SmartPhone - HTC One M8 - **42**');

		const charger = result.getCharger('Pesho', 'Gosho', 20, 19, 1000);
		expect(charger.getLabel()).to.equal('Charger - Pesho Gosho - **20**');

		const router = result.getRouter('Gosho', 'Pesho', 80, 30, 5);
		expect(router.getLabel()).to.equal('Router - Gosho Pesho - **80**');

		const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false);
		expect(headphones.getLabel()).to.equal('Headphones - Sennheiser HD 598 - **340**');
	});

	it('Test #6', function() {
		// HardwareStore.stock

		const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		const charger = result.getCharger('Pesho', 'Gosho', 20, 19, 1000);
		const router = result.getRouter('Gosho', 'Pesho', 80, 30, 5);
		const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false);

		[ phone, charger, router, headphones ]
			.forEach(product => {
				const store = result.getHardwareStore('Technosomething');
				store.stock(product, 42);

				expect(store.products).to.have.length(1);
				expect(store.products[0].id).to.equal(product.id);
			});

		let store = result.getHardwareStore('Praktiker');
		expect(() => store.stock(charger, 'many')).to.throw();
		expect(() => store.stock(charger, [1, 2, 3])).to.throw();
		expect(() => store.stock(charger, -4)).to.throw();
		expect(() => store.stock(charger, 0)).to.throw();

		store = result.getHardwareStore('Praktiker')
			.stock(phone, 1)
			.stock(charger, 2)
			.stock(router, 3)
			.stock(headphones, 4);

		let actualIDs = store.products.map(x => x.id).sort();
		const expectedIDs = [ phone.id, charger.id, router.id, headphones.id ].sort();
		expect(actualIDs).to.eql(expectedIDs);

		store.stock(phone, 8);
		actualIDs = store.products.map(x => x.id).sort();
		expect(actualIDs).to.eql(expectedIDs);
	});

	it('Test #7', function() {
		// HardwareStore.sell

		const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		const charger = result.getCharger('Pesho', 'Gosho', 20, 19, 1000);
		const router = result.getRouter('Gosho', 'Pesho', 80, 30, 5);
		const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false);

		let store = result.getHardwareStore('Praktiker');
		expect(() => store.sell('candy', 1)).to.throw();

		store = result.getHardwareStore('Praktiker')
			.stock(phone, 1);
		expect(() => store.sell(phone.id, 'all')).to.throw();
		expect(() => store.sell(phone.id, -1)).to.throw();
		expect(() => store.sell(phone.id, 0)).to.throw();
		expect(() => store.sell(phone.id, NaN)).to.throw();
		expect(() => store.sell(phone.id, 2)).to.throw();

		store = result.getHardwareStore('Praktiker')
			.stock(phone, 1)
			.stock(charger, 2)
			.stock(router, 3)
			.stock(headphones, 4);

		store.sell(phone.id, 1);
		let actualIDs = store.products.map(x => x.id).sort();
		let expectedIDs = [ charger.id, router.id, headphones.id ].sort();
		expect(actualIDs).to.eql(expectedIDs);

		store.sell(headphones.id, 2);
		actualIDs = store.products.map(x => x.id).sort();
		expect(actualIDs).to.eql(expectedIDs);

		store.sell(headphones.id, 2).sell(router.id, 1);
		actualIDs = store.products.map(x => x.id).sort();
		expectedIDs = [ charger.id, router.id ].sort();
		expect(actualIDs).to.eql(expectedIDs);

		expect(() => store.sell(router.id, 3)).to.throw();
	});

	it('Test #8', function() {
		// HardwareStore.getSold

		const phone = result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android');
		const charger = result.getCharger('Pesho', 'Gosho', 20, 19, 1000);
		const router = result.getRouter('Gosho', 'Pesho', 80, 30, 5);
		const headphones = result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false);

		store = result.getHardwareStore('Praktiker')
			.stock(phone, 1)
			.stock(charger, 2)
			.stock(router, 3)
			.stock(headphones, 4);

		expect(store.getSold()).to.equal(0);

		store.sell(phone.id, 1);
		expect(store.getSold()).to.equal(42);

		store.sell(headphones.id, 2);
		expect(store.getSold()).to.equal(722);

		store.sell(headphones.id, 2).sell(router.id, 1);
		expect(store.getSold()).to.equal(1482);
	});

	it('Test #9', function() {
		// HardwareStore.search

		const products = [
			result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android'),
			result.getCharger('Pesho', 'Gosho', 20, 19, 1000),
			result.getRouter('Gosho', 'Pesho', 80, 30, 5),
			result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false),
			result.getSmartPhone('alabala', 'Pesho', 42, 5, 'Android'),
			result.getSmartPhone('PesHo', 'alabala', 42, 5, 'Android'),
		];

		const store = result.getHardwareStore('Technomarket');
		products.forEach((p, i) => store.stock(p, i * 17 + 13));

		let expectedIDs = [ products[1].id, products[2].id, products[4].id, products[5].id ].sort();
		let expectedQuantities = [ 17 + 13, 2 * 17 + 13, 4 * 17 + 13, 5 * 17 + 13 ].sort();

		let actual = store.search('sh');
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);
	});

	it('Test #10', function() {
		// HardwareStore.search advanced

		const products = [
			result.getSmartPhone('HTC', 'One M8', 42, 5, 'Android'),
			result.getCharger('Pesho', 'Gosho', 20, 19, 1000),
			result.getRouter('Gosho', 'Pesho', 80, 30, 5),
			result.getHeadphones('Sennheiser', 'HD 598', 340, 'high', false),
			result.getSmartPhone('alabala', 'Pesho', 42, 5, 'Android'),
			result.getSmartPhone('PesHo', 'alabala', 42, 5, 'Android'),
		];

		const store = result.getHardwareStore('Technomarket');
		products.forEach((p, i) => store.stock(p, i * 17 + 13));

		let expectedIDs = [ products[1].id, products[2].id, products[4].id ].sort();
		let expectedQuantities = [ 17 + 13, 2 * 17 + 13, 4 * 17 + 13 ].sort();

		let actual = store.search({modelPattern: 'sh'});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		expectedIDs = [ products[1].id, products[2].id ].sort();
		expectedQuantities = [ 17 + 13, 2 * 17 + 13 ].sort();

		actual = store.search({manufacturerPattern: 'sh'});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		expectedIDs = [ products[0].id, products[4].id, products[5].id ].sort();
		expectedQuantities = [ 13, 4 * 17 + 13, 5 * 17 + 13 ].sort();

		actual = store.search({type: 'SmartPhone'});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		expectedIDs = [ products[2].id, products[3].id ].sort();
		expectedQuantities = [ 2 * 17 + 13, 3 * 17 + 13 ].sort();

		actual = store.search({minPrice: 64});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		expectedIDs = [ products[0].id, products[1].id, products[4].id, products[5].id ].sort();
		expectedQuantities = [ 13, 17 + 13, 4 * 17 + 13, 5 * 17 + 13 ].sort();

		actual = store.search({maxPrice: 64});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		expectedIDs = [ products[0].id, products[4].id, products[5].id ].sort();
		expectedQuantities = [ 13, 4 * 17 + 13, 5 * 17 + 13 ].sort();

		actual = store.search({minPrice: 40, maxPrice: 44});
		expect(actual.map(x => x.product.id).sort()).to.eql(expectedIDs);
		expect(actual.map(x => x.quantity).sort()).to.eql(expectedQuantities);

		actual = store.search({minPrice: 70, type: 'Charger'});
		expect(actual).to.eql([]);
	});
});
