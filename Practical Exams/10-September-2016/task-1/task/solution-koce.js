function solve() {
    'use strict'

    class Product {
        constructor(productType, name, price) {
            this.productType = productType
            this.name = name
            this.price = Number(price)
        }
        equals(otherProduct) {
            return (this.name === otherProduct.name) &&
                (this.productType === otherProduct.productType) &&
                (this.price === otherProduct.price)
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = []
        }

        add(product) {
            this.products.push(product)
            return this
        }

        remove(product) {
            const indexOfProduct = this.products.findIndex(p => p.equals(product))

            if (indexOfProduct === -1) {
                throw new Error('Cannot remove product that is not in the shopping cart!')
            }

            return this.products.splice(indexOfProduct, 1)
        }

        showCost() {
            return this.products.reduce((partialCost, currentProduct) => partialCost + currentProduct.price, 0)
        }

        showProductTypes() {
            const typesMap = {}

            for(const prod of this.products) {
                typesMap[prod.productType] = true
            }

            return Object.keys(typesMap).sort((first, second) => first.localeCompare(second))
        }

        getInfo() {
            const productMap = {}

            for (const p of this.products) {
                if (!productMap[p.name]) {
                    productMap[p.name] = {
                        name: p.name,
                        totalPrice: 0,
                        quantity: 0
                    }
                }

                productMap[p.name].totalPrice += p.price
                productMap[p.name].quantity += 1
            }

            const products = Object.keys(productMap).map(groupName => productMap[groupName]),
                totalPrice = products.reduce((partialPrice, currentProductGroup) => partialPrice + currentProductGroup.totalPrice, 0)

            return {
                products,
                totalPrice
            }
        }
    }
    return {
        Product,
        ShoppingCart
    }
}

module.exports = solve