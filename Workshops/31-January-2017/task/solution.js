function solve() {
	function getProduct(productType, name, price) {
		// validations
		return {
			productType: productType,
			name: name,
			price: price
		};
	}

	function getShoppingCart() {
		const products = [];

		function add(product) {
			products.push(product);
			return this;
		}

		function remove(product) {
			const index = products.findIndex(p => p.name === product.name && p.productType === product.productType && p.price === product.price);

			if(index < 0) {
				throw 'Product not found';
			}

			products.splice(index, 1);

			return this;
		}

		function showCost() {
			return products.reduce((cost, product) => cost + product.price, 0);
		}

		function showProductTypes() {
			/*const uniqTypes = [];
			products.forEach(function(p) {
				if(uniqTypes.indexOf(p.productType) < 0) {
					uniqTypes.push(p.productType);
				}
			});

			return uniqTypes.sort();*/

			/*
			return products.map(p => p.productType)
				.sort()
				.filter((p, i, ps) => i === 0 || p !== ps[i - 1]);
			*/

			const uniqTypesObj = {};
			products.forEach(p => uniqTypesObj[p.productType] = true);
			return Object.keys(uniqTypesObj).sort();
		}

		function getInfo() {
			/*
			const uniqNames = products.map(p => p.name)
				.sort()
				.filter((p, i, ps) => i === 0 || p !== ps[i - 1])
				.map(name => {
					const withThisName = products.filter(p => p.name === name);

					return {
						name: name,
						quantity: withThisName.length,
						totalPrice: withThisName.reduce((cost, product) => cost + product.price, 0)
					};
				});

			return {
				products: uniqNames,
				totalPrice: showCost()
			}
			*/

			const groupedByName = {};

			products.forEach(p => {
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
				totalPrice: showCost()
			}
		}

		return {
	    products: products,
	    add: add,
	    remove: remove,
	    showCost: showCost,
	    showProductTypes: showProductTypes,
	    getInfo: getInfo
		};
	}

	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();
