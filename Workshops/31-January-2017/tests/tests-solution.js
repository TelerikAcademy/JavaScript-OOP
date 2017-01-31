/* globals require, describe, beforeEach it console */
const expect = require("chai").expect;
const result = require("../task/solution.js");

describe("Tests", () => {
    describe("Zero tests", () => {
		describe("Product tests", () => {
			it("expect `getProduct` to be a function", () => {
				expect(result.getProduct).to.be.a("function");
			});

			it("expect `getProduct` to return an object", () => {
				expect(result.getProduct()).to.be.an("object");
			});
		});

		describe("ShoppingCart tests", () => {
			it("expect `getShoppingCart` to be a function", () => {
				expect(result.getShoppingCart).to.be.a("function");
			});

			it("expect `getShoppingCart` to return an object", () => {
				expect(result.getShoppingCart()).to.be.an("object");
			});

			it("expect ShoppingCart object to have method `add()`", () => {
				expect(result.getShoppingCart().add).to.be.a("function");
			});

			it("expect ShoppingCart object to have method `remove()`", () => {
				expect(result.getShoppingCart().remove).to.be.a("function");
			});

			it("expect ShoppingCart object to have method `showCost()`", () => {
				expect(result.getShoppingCart().showCost).to.be.a("function");
			});

			it("expect ShoppingCart object to have method `showProductTypes()`", () => {
				expect(result.getShoppingCart().showProductTypes).to.be.a("function");
			});

			it("expect ShoppingCart object to have method `getInfo()`", () => {
				expect(result.getShoppingCart().getInfo).to.be.a("function");
			});
		});
    });

    describe("Regular tests", () => {
        it("expect creating a product to have properties `name`, `price` and `productType` set", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";

            const product = result.getProduct(productType, name, price);
            expect(product.name).to.equal(name);
            expect(product.price).to.equal(price);
            expect(product.productType).to.equal(productType);
        });

        it("expect `cart.products` to contain a single element, after `cart.add(product)` is performed", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            const product = result.getProduct(productType, name, price);

            const cart = result.getShoppingCart();

            cart.add(product);

            expect(cart.products).to.has.length(1);
        });

        it("expect `cart.products` to contain the `product`, after `cart.add(product)` is performed", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            const product = result.getProduct(productType, name, price);

            const cart = result.getShoppingCart();

            cart.add(product);

            expect(cart.products[0]).to.eql(product);
        });

        it("expect `cart.add(product)` to provide chaining", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            const product = result.getProduct(productType, name, price);
            const cart = result.getShoppingCart();

            const otherCart = cart.add(product);
            expect(cart).to.equal(otherCart);
        });

        it("expect `cart.remove(product)` to remove the product from the `cart.products` array", () => {
            const count = 5,
                productType = "type",
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(productType, `Product #${i}`, price));

            const product = products[0 | (products.length / 2)];
            const cart = result.getShoppingCart();

			cart.products.push(...products);

            cart.remove(product);
            expect(cart.products).to.has.length(products.length - 1);
            expect(cart.products).not.to.contain(product);
        });


        it("expect `cart.remove(product)` to throw an exception, if the `product` is missing from the `cart.products` array", () => {
            const count = 5,
                productType = "type",
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(productType, `Product #${i}`, price));

            const product = result.getProduct("Test", "Test", 1.3);
            const cart = result.getShoppingCart();

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            function removeMissingProduct() {
                cart.remove(product);
            }

            expect(removeMissingProduct).to.throw();
        });

        it("expect `cart.remove()` executed with all products to leave empty `cart.products` array", () => {
            const count = 5,
                productType = "type",
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(productType, `Product #${i}`, price));

            const cart = result.getShoppingCart();

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            products.forEach(pr => cart.remove(pr));

            expect(cart.products).to.has.length(0);
        });


        it("expect `cart.remove()` on empty `cart.products` to throw an exception", () => {
            const cart = result.getShoppingCart();

            expect(cart.remove).to.be.a("function");

            function removeThrowsWhenEmpty() {
                cart.remove();
            }
            expect(removeThrowsWhenEmpty).to.throw();
        });

        it("expect `cart.remove(product)` to provide chaining", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            const product = result.getProduct(productType, name, price);
            const cart = result.getShoppingCart();

            cart.add(product);
            const otherCart = cart.remove(product);
            expect(cart).to.equal(otherCart);
        });

        it("expect `cart.showCost()` to return `0` when no products are added", () => {
            const cart = result.getShoppingCart();
            expect(cart.showCost()).to.equal(0);
        });

        it("expect `cart.showCost()` to work when `cart.products` is not empty", () => {
            const cart = result.getShoppingCart();

            const count = 5,
                productType = "type",
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(productType, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            const expectedCost = products.reduce((s, pr) => s + pr.price, 0);

            expect(cart.showCost()).to.equal(expectedCost);
        });


        it("expect `cart.showProductTypes()` to return an empty array when `cart.products` is empty", () => {
            const cart = result.getShoppingCart();

            expect(cart.showProductTypes()).to.has.length(0);
        });

        it("expect `cart.showProductTypes()` to return only the unique product types, when no repeating product types", () => {
            const cart = result.getShoppingCart();

            const count = 5,
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(`Type #${i + 1}`, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            expect(cart.showProductTypes()).to.has.length(products.length);
        });

        it("expect `cart.showProductTypes()` to return only the sorted unique product types, when there are repeating product types", () => {
            const cart = result.getShoppingCart();

            const count = 15,
                productTypes = ["type 3", "type 2", "type 1"],
                price = 3.5;

            const products = Array.from({ length: count })
                .map((_, i) => result.getProduct(`${productTypes[i % productTypes.length]}`, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            const expectedProductTypes = productTypes.sort((t1, t2) => t1.localeCompare(t2));
            const actualProductTypes = cart.showProductTypes();
            expect(actualProductTypes).to.has.length(expectedProductTypes.length);
            for (let i = 0; i < expectedProductTypes.length; i += 1) {
                expect(actualProductTypes[i]).to.equal(expectedProductTypes[i]);
            }
        });

        it("expect `cart.getInfo()` to return an object with empty `product` array and `totalPrice` equal to `0`, when `cart.products` is empty", () => {
            const cart = result.getShoppingCart();

            const info = cart.getInfo();
            expect(info.products).to.has.length(0);
            expect(info.totalPrice).to.equal(0);
        });

        it("expect `cart.getInfo()` to return an object with `product` array with 2 products and `totalPrice` equal to `20`, when `cart.products` has products", () => {
            const cart = result.getShoppingCart();
            cart.products = cart.products || [];
            cart.products.push(result.getProduct("Type 1", "Pr 1", 1));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 3));


            cart.products.push(result.getProduct("Type 1", "Pr 2", 5));
            cart.products.push(result.getProduct("Type 1", "Pr 2", 5));

            const info = cart.getInfo();
            expect(info.products).to.has.length(2);
            expect(info.totalPrice).to.equal(20);
        });

        it("expect `cart.getInfo()` to return an object with `product` array with 2 products and `totalPrice` equal to `20`, when `cart.products` has products", () => {
            const cart = result.getShoppingCart();
            cart.products = cart.products || [];
            cart.products.push(result.getProduct("Type 1", "Pr 1", 1));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 2));
            cart.products.push(result.getProduct("Type 1", "Pr 1", 3));


            cart.products.push(result.getProduct("Type 1", "Pr 2", 5));
            cart.products.push(result.getProduct("Type 1", "Pr 2", 6));

			const expected = [
				{ name: 'Pr 1', totalPrice: 10, quantity: 5 },
				{ name: 'Pr 2', totalPrice: 11, quantity: 2 }
			];
            const actual = cart.getInfo().products;
            expect(actual).to.eql(expected);
        });
    });
});
