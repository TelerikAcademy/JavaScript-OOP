function solve() {
  class Product {
    constructor(productType, name, price) {
      this._productType = productType;
      this._name = name;
      this._price = price;
    }

    get productType() {
      return this._productType;
    }
    get name() {
      return this._name;
    }
    get price() {
      return this._price;
    }
  }

  class ShoppingCart {
    constructor() {
      this._products = [];
    }

    get products() {
      return this._products;
      // return this._products.slice();
    }

    add(product) {
			this.products.push(new Product(product.productType, product.name, product.price));
			return this;
		}

		remove(product) {
			const index = this.products.findIndex(p => p.name === product.name && p.productType === product.productType && p.price === product.price);

			if(index < 0) {
				throw 'Product not found';
			}

			this.products.splice(index, 1);

			return this;
		}

		showCost() {
			return this.products.reduce((cost, product) => cost + product.price, 0);
		}

		showProductTypes() {
			/*const uniqTypes = [];
			this.products.forEach(function(p) {
				if(uniqTypes.indexOf(p.productType) < 0) {
					uniqTypes.push(p.productType);
				}
			});

			return uniqTypes.sort();*/

			/*
			return this.products.map(p => p.productType)
				.sort()
				.filter((p, i, ps) => i === 0 || p !== ps[i - 1]);
			*/

			const uniqTypesObj = {};
			this.products.forEach(p => uniqTypesObj[p.productType] = true);
			return Object.keys(uniqTypesObj).sort();
		}

		getInfo() {
			/*
			const uniqNames = this.products.map(p => p.name)
				.sort()
				.filter((p, i, ps) => i === 0 || p !== ps[i - 1])
				.map(name => {
					const withThisName = this.products.filter(p => p.name === name);

					return {
						name: name,
						quantity: withThisName.length,
						totalPrice: withThisName.reduce((cost, product) => cost + product.price, 0)
					};
				});

			return {
				this.products: uniqNames,
				totalPrice: showCost()
			}
			*/

			const groupedByName = {};

			this.products.forEach(p => {
				if(groupedByName.hasOwnProperty(p.name)) {
					groupedByName[p.name].quantity += 1;
					groupedByName[p.name].totalPrice += p.price;
				}
				else {
					groupedByName[p.name] = {
						name: p.name,
						quantity: 1,
					 	totalPrice: p.price
					};
				}
			});

			const groups = Object.keys(groupedByName)
				.sort()
				.map(n => {
					return {
						name: n,
						quantity: groupedByName[n].quantity,
						totalPrice: groupedByName[n].totalPrice
					};
				});

			return {
				//products: Object.values(groupedByName).sort(x => x.name),
				products: groups,
				totalPrice: this.showCost()
			}
		}
  }

  return {
    Product: Product,
    ShoppingCart: ShoppingCart
  }
}

module.exports = solve;
