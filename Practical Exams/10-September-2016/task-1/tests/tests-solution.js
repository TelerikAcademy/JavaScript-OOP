/* globals require, describe, beforeEach it console */
var expect = require("chai").expect;


describe("Tests", () => {
    let result;
    beforeEach(() => {
        result = require("../task/solution")();
    });

    describe("Zero tests", () => {
        it("Zero test 1: expect `Product` class to be a function", () => {
            expect(result.Product).to.be.a("function");
        });

        it("Zero test 2: expect `ShoppingCart to be a function", () => {
            expect(result.ShoppingCart).to.be.a("function");
        });

        it("Zero test 3: expect `ShoppingCart.prototype` to has method `add()`", () => {
            expect(result.ShoppingCart.prototype.add).to.be.a("function");
        });

        it("Zero test 4: expect `ShoppingCart.prototype` to has method `remove()`", () => {
            expect(result.ShoppingCart.prototype.remove).to.be.a("function");
        });

        it("Zero test 5: expect `ShoppingCart.prototype` to has method `showCost()`", () => {
            expect(result.ShoppingCart.prototype.showCost).to.be.a("function");
        });

        it("Zero test 6: expect `ShoppingCart.prototype` to has method `showProductTypes()`", () => {
            expect(result.ShoppingCart.prototype.showProductTypes).to.be.a("function");
        });

        it("Zero test 7: expect `ShoppingCart.prototype` to has method `getInfo()`", () => {
            expect(result.ShoppingCart.prototype.getInfo).to.be.a("function");
        });
    });

    describe("Regular tests", () => {
        it("Regular test 1: expect creating a product to has properties `name`, `price` and `productType` set", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";

            let product = new result.Product(productType, name, price);
            expect(product.name).to.equal(name);
            expect(product.price).to.equal(price);
            expect(product.productType).to.equal(productType);
        });

        it("Regular test 2: expect `cart.products` to contain a single element, after `cart.add(product)` is performed", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            let product = new result.Product(productType, name, price);

            let cart = new result.ShoppingCart();

            cart.add(product);

            expect(cart.products).to.has.length(1);
            expect(cart.products[0]).to.equal(product);
        });

        it("Regular test 2: expect `cart.add(product)` to provide chaining", () => {
            const name = "Sample",
                price = 1.7,
                productType = "Type #1";
            let product = new result.Product(productType, name, price);
            let cart = new result.ShoppingCart();

            let otherCart = cart.add(product);
            expect(cart).to.equal(otherCart);
        });

        it("Regular test 3: expect `cart.remove(product)` to remove the product from the `cart.products` array", () => {
            const count = 5,
                productType = "type",
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(productType, `Product #${i}`, price));

            let product = products[0 | (products.length / 2)];
            let cart = new result.ShoppingCart();

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            cart.remove(product);
            expect(cart.products).to.has.length(products.length - 1);
            expect(cart.products).not.to.contain(product);
        });


        it("Regular test 4: expect `cart.remove(product)` to throw an exception, if the `product` is missing from the `cart.products` array", () => {
            expect(result.ShoppingCart.prototype.remove).to.be.a("function");

            const count = 5,
                productType = "type",
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(productType, `Product #${i}`, price));

            let product = new result.Product("Test", "Test", 1.3);
            let cart = new result.ShoppingCart();

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            function removeMissingProduct() {
                cart.remove(product);
            }

            expect(removeMissingProduct).to.throw();
        });

        it("Regular test 5: expect `cart.remove()` executed with all products to leave empty `cart.products` array", () => {
            const count = 5,
                productType = "type",
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(productType, `Product #${i}`, price));

            let cart = new result.ShoppingCart();

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            products.forEach(pr => cart.remove(pr));

            expect(cart.products).to.has.length(0);
        });


        it("Regular test 6: expect `cart.remove()` on empty `cart.products` to throw an exception", () => {
            let cart = new result.ShoppingCart();

            expect(cart.remove).to.be.a("function");

            function removeThrowsWhenEmpty() {
                cart.remove();
            }
            expect(removeThrowsWhenEmpty).to.throw();
        });

        it("Regular test 7: expect `cart.showCost()` to return `0` when no products are added", () => {
            let cart = new result.ShoppingCart();
            expect(cart.showCost()).to.equal(0);
        });

        it("Regular test 8: expect `cart.showCost()` to work when `cart.products` is not empty", () => {
            let cart = new result.ShoppingCart();

            const count = 5,
                productType = "type",
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(productType, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            let expectedCost = products.reduce((s, pr) => s + pr.price, 0);

            expect(cart.showCost()).to.equal(expectedCost);
        });


        it("Regular test 9: expect `cart.showProductTypes()` to return an empty array when `cart.products` is empty", () => {
            let cart = new result.ShoppingCart();

            expect(cart.showProductTypes()).to.has.length(0);
        });

        it("Regular test 10: expect `cart.showProductTypes()` to return only the unique product types, when no repeating product types", () => {
            let cart = new result.ShoppingCart();

            const count = 5,
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(`Type #${i + 1}`, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            expect(cart.showProductTypes()).to.has.length(products.length);
        });

        it("Regular test 11: expect `cart.showProductTypes()` to return only the sorted unique product types, when there are repeating product types", () => {
            let cart = new result.ShoppingCart();

            const count = 15,
                productTypes = ["type 3", "type 2", "type 1"],
                price = 3.5;

            let products = Array.from({ length: count })
                .map((_, i) => new result.Product(`${productTypes[i % productTypes.length]}`, `Product #${i}`, price));

            cart.products = cart.products || [];
            products.forEach(pr => cart.products.push(pr));

            let expectedProductTypes = productTypes.sort((t1, t2) => t1.localeCompare(t2));
            let actualProductTypes = cart.showProductTypes();
            expect(actualProductTypes).to.has.length(expectedProductTypes.length);
            for (let i = 0; i < expectedProductTypes.length; i += 1) {
                expect(actualProductTypes[i]).to.equal(expectedProductTypes[i]);
            }
        });

        it("Regular test 12: expect `cart.getInfo()` to return an object with empty `product` array and `totalPrice` equal to `0`, when `cart.products` is empty", () => {
            let cart = new result.ShoppingCart();

            let info = cart.getInfo();
            expect(info.products).to.has.length(0);
            expect(info.totalPrice).to.equal(0);
        });

        it("Regular test 13: expect `cart.getInfo()` to return an object with `product` array with 2 products and `totalPrice` equal to `20`, when `cart.products` has products", () => {
            let cart = new result.ShoppingCart();
            cart.products = cart.products || [];
            cart.products.push(new result.Product("Type 1", "Pr 1", 1));
            cart.products.push(new result.Product("Type 1", "Pr 1", 2));
            cart.products.push(new result.Product("Type 1", "Pr 1", 2));
            cart.products.push(new result.Product("Type 1", "Pr 1", 2));
            cart.products.push(new result.Product("Type 1", "Pr 1", 3));


            cart.products.push(new result.Product("Type 1", "Pr 2", 5));
            cart.products.push(new result.Product("Type 1", "Pr 2", 5));

            let info = cart.getInfo();
            expect(info.products).to.has.length(2);
            expect(info.totalPrice).to.equal(20);
        });
    });
});