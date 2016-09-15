/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = +price;
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {
            this.products.push(product);
            return this;
        }

        remove(product) {
            let index = this.products.findIndex(pr => pr.name === product.name && pr.cost === product.cost && pr.productType === product.productType);
            if (index < 0) {
                throw new Error("No such product");
            }

            this.products.splice(index, 1);
            return this;
        }

        showCost() {
            let cost = this.products.reduce((c, p) => c + p.price, 0);
            return cost;
        }

        showProductTypes() {
            let productTypesMap = {};
            this.products.forEach(pr => {
                productTypesMap[pr.productType] = 1;
            });

            return Object.keys(productTypesMap)
                .sort((x, y) => x.localeCompare(y));
        }

        getInfo() {
            let allProducts = {};
            this.products.forEach(pr => {
                if (!allProducts[pr.name]) {
                    allProducts[pr.name] = {
                        "name": pr.name,
                        "totalPrice": 0,
                        "quantity": 0
                    };
                }

                allProducts[pr.name].totalPrice += pr.price;
                allProducts[pr.name].quantity += 1;
            });

            let products = Object.keys(allProducts)
                .sort((k1, k2) => k1.localeCompare(k2))
                .map(key => allProducts[key]);

            let totalPrice = products.reduce((tp, pr) => tp + pr.totalPrice, 0);
            return {
                products,
                totalPrice
            };
        }
    }
    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;