function solve() {
	const getNextId = (function() {
		let counter = 0;
		return function() {
			counter += 1;
			return counter;
		};
	}());

	const VALIDATOR = {
		stringLength(str, min, max) {
			if(typeof str !== 'string') {
				throw '';
			}
			this.numberRange(str.length, min, max);
		},
		numberRange(num, min, max) {
			if(typeof num !== 'number' || Number.isNaN(num) || num < min || num > max) {
				throw '';
			}
		},
		positiveNumber(num) {
			if(typeof num !== 'number' || Number.isNaN(num) || !(num > 0)) {
				throw '';
			}
		},
		positiveIngeger(num) {
			this.positiveNumber(num);
			if((num | 0) !== num) {
				throw '';
			}
		}
	};

	class Product {
		constructor(manufacturer, model, price) {
			this._id = getNextId();

			VALIDATOR.stringLength(manufacturer, 1, 20);
			VALIDATOR.stringLength(model, 1, 20);
			VALIDATOR.positiveNumber(price, 1, 20);

			this._manufacturer = manufacturer;
			this._model = model;
			this._price = price;
		}

		get id() {
			return this._id;
		}

		get manufacturer() {
			return this._manufacturer;
		}

		get model() {
			return this._model;
		}

		get price() {
			return this._price;
		}

		getLabel() {
			return this.manufacturer + ' ' + this.model + ' - **' + this.price + '**';
		}
	}

	class SmartPhone extends Product {
		constructor(manufacturer, model, price, screenSize, operatingSystem) {
			super(manufacturer, model, price);

			VALIDATOR.positiveNumber(screenSize);
			VALIDATOR.stringLength(operatingSystem, 1, 10);

			this._screenSize = screenSize;
			this._operatingSystem = operatingSystem;
		}

		get screenSize() {
			return this._screenSize;
		}

		get operatingSystem() {
			return this._operatingSystem;
		}

		getLabel() {
			return 'SmartPhone - ' + super.getLabel();
		}
	}

	class Charger extends Product {
		constructor(manufacturer, model, price, outputVoltage, outputCurrent) {
			super(manufacturer, model, price);

			VALIDATOR.numberRange(outputVoltage, 5, 20);
			VALIDATOR.numberRange(outputCurrent, 100, 3000);

			this._outputVoltage = outputVoltage;
			this._outputCurrent = outputCurrent;
		}

		get outputVoltage() {
			return this._outputVoltage;
		}

		get outputCurrent() {
			return this._outputCurrent;
		}

		getLabel() {
			return 'Charger - ' + super.getLabel();
		}
	}

	class Router extends Product {
		constructor(manufacturer, model, price, wifiRange, lanPorts) {
			super(manufacturer, model, price);

			VALIDATOR.positiveNumber(wifiRange);
			VALIDATOR.positiveIngeger(lanPorts);

			this._wifiRange = wifiRange;
			this._lanPorts = lanPorts;
		}

		get wifiRange() {
			return this._wifiRange;
		}

		get lanPorts() {
			return this._lanPorts;
		}

		getLabel() {
			return 'Router - ' + super.getLabel();
		}
	}

	class Headphones extends Product {
		constructor(manufacturer, model, price, quality, hasMicrophone) {
			super(manufacturer, model, price);

			if(quality !== 'high' && quality !== 'mid' && quality !== 'low') {
				throw '';
			}

			this._quality = quality;
			this._hasMicrophone = !!hasMicrophone;
		}

		get quality() {
			return this._quality;
		}

		get hasMicrophone() {
			return this._hasMicrophone;
		}

		getLabel() {
			return 'Headphones - ' + super.getLabel();
		}
	}

	class HardwareStore {
		constructor(name) {
			VALIDATOR.stringLength(name, 1, 20);

			this._name = name;
			this._products = [];
			this._sold = 0;
			this._grouped = {};
		}

		get name() {
			return this._name;
		}
		
		get products() {
			return this._products.slice();
		}

		stock(product, quantity) {
			if(!(product instanceof Product)) {
				throw 'Not a product';
			}

			VALIDATOR.positiveIngeger(quantity);

			if(!this._grouped[product.id]) {
				this._products.push(product);
				this._grouped[product.id] = { product, quantity };
			}
			else {
				this._grouped[product.id].quantity += quantity;
			}

			return this;
		}

		sell(productId, quantity) {
			VALIDATOR.positiveIngeger(quantity);

			const group = this._grouped[productId];
			if(!group) {
				throw 'Not available';
			}
			if(group.quantity < quantity) {
				throw 'Not enough';
			}

			group.quantity -= quantity;
			this._sold += group.product.price * quantity;

			if(group.quantity === 0) {
				this._grouped[productId] = false;
				const index = this._products.findIndex(x => x.id === productId);
				this._products.splice(index, 1);
			}

			return this;
		}

		getSold() {
			return this._sold;
		}

		search(options) {
			let result;

			if(typeof options !== 'object') { // well, it must be a string then
				const pattern = options.toLowerCase();
				result = this._products.filter(p => p.manufacturer.toLowerCase().indexOf(pattern) >= 0 || p.model.toLowerCase().indexOf(pattern) >= 0);
			}
			else {
				result = this._products;

				if(options.hasOwnProperty('manufacturerPattern')) {
					const pattern = options.manufacturerPattern;
					result = result.filter(p => p.manufacturer.indexOf(pattern) >= 0);
				}
				if(options.hasOwnProperty('modelPattern')) {
					const pattern = options.modelPattern;
					result = result.filter(p => p.model.indexOf(pattern) >= 0);
				}

				if(options.hasOwnProperty('minPrice')) {
					result = result.filter(p => p.price >= options.minPrice);
				}
				if(options.hasOwnProperty('maxPrice')) {
					result = result.filter(p => p.price <= options.maxPrice);
				}

				if(options.hasOwnProperty('type')) {
					let base = false;
					switch(options.type) {
						case 'SmartPhone': base = SmartPhone; break;
						case 'Charger': base = Charger; break;
						case 'Router': base = Router; break;
						case 'Headphones': base = Headphones; break;
					}
					result = result.filter(p => p instanceof base);
				}
			}

			return result.map(x => this._grouped[x.id]);
		}
	}

	return {
		getSmartPhone(manufacturer, model, price, screenSize, operatingSystem) {
			return new SmartPhone(manufacturer, model, price, screenSize, operatingSystem);
		},
		getCharger(manufacturer, model, price, outputVoltage, outputCurrent) {
			return new Charger(manufacturer, model, price, outputVoltage, outputCurrent);
		},
		getRouter(manufacturer, model, price, wifiRange, lanPorts) {
			return new Router(manufacturer, model, price, wifiRange, lanPorts);
		},
		getHeadphones(manufacturer, model, price, quality, hasMicrophone) {
			return new Headphones(manufacturer, model, price, quality, hasMicrophone);
		},
		getHardwareStore(name) {
			return new HardwareStore(name);
		}
	};
}

// Submit the code above this line in bgcoder.com
module.exports = solve; // DO NOT SUBMIT THIS LINE
