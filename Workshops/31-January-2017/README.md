# Carts and Products

- Implement a functionality to serve a Shopping Center
  - Export a function named **`getProduct`**
    - **Parameters**
      - `productType`
      - `name`
      - `price`
    - _Example_:
      - `getProduct("Sweets", "Shokolad Milka", 2)`
    - **Returns an object that contains**:
      - `productType`: `String`
      - `name`: `String`
      - `price`: `Number`
  - Export a function named **`getShoppingCart`**
    - **No parameters**
    - _Example_: 
      - `getShoppingCart()`
    - **Returns an object that contains**:
      - `products`: `Array`
	  - `add`: `Function`
	  - `remove`: `Function`
	  - `showCost`: `Function`
	  - `showProductTypes`: `Function`
	  - `getInfo`: `Function`

## Behavior of the `ShoppingCart` object methods

- `add(product)`
  - **Parameters**:
    - A `Product` or Product-like object
  - **Behavior**:
    - Adds the `product` to the `products` array in the `ShoppingCart` instance
    - A product can be added many times into the same `ShoppingCart` instance
    - **Should provide chaining**
- `remove(product)`
  - **Parameters**
    - a `Product` or Product-like object
  - **Behavior**:
    - Removes the left-most object from the `products` array in the `ShoppingCart` instance, that has the same `name`, `price` and `productType`
    - **Should provide chaining**
  - **Throws** when:
    - The `ShoppingCart` instance does not contain the product
    - There are not products in the `ShoppingCart` instance
- `showCost()`
  - **No parameters**
  - **Behavior**:
    - Returns the sum from the costs of all products in the `ShoppingCart` instance
    - Returns `0` when there are no products in the `ShoppingCart` instance
- `showProductTypes()`
  - **No parameters**
  - **Behavior**:
    - Returns the **unique productTypes** of the products added to the `ShoppingCart` instance
      - The returned product types must be **sorted alphabetically**
    - Returns an empty array when there are no products in the `ShoppingCart` instance
- `getInfo()`
  - **No parameters**
  - **Behavior**:
    - Returns an object containing information about the products in the `ShoppingCart` instance. The returned object has two properties:
      - `products`: Groups products by their name
        - For each unique product name there creates an element:
          - The `name` of the products
          - Their total cost
          - The quantity of products with the name in the `ShoppingCart` instance
        - The groups must be **sorted alphabetically** by name
      - `totalPrice`: The total price of all products in the `ShoppingCart` instance
    - Returns an object with `totalPrice` equal to `0` and `products` - an empty array, when no products in the `ShoppingCart` instance

## Solution template

```javascript
function solve() {
	function getProduct(productType, name, price) {
	}

	function getShoppingCart() {
	}

	return {
		getProduct: getProduct,
		getShoppingCart: getShoppingCart
	};
}

module.exports = solve();
```

## Example usage:

```javascript
const {getProduct, getShoppingCart} = solve();

let cart = getShoppingCart();

let pr1 = getProduct("Sweets", "Shokolad Milka", 2);
cart.add(pr1);
console.log(cart.showCost());
// prints `2`

let pr2 = getProduct("Groceries", "Salad", 0.5);
cart.add(pr2);
cart.add(pr2);
console.log(cart.showCost());
// prints `3`

console.log(cart.showProductTypes());
// prints [ 'Groceries', 'Sweets' ]

console.log(cart.getInfo());
/* prints
{
    totalPrice: 3
    products: [{
        name: "Salad",
        totalPrice: 1,
        quantity: 2
    }, {
       name: "Shokolad Milka",
       totalPrice: 2,
       quantity: 1 
    }]
}
*/

cart.remove({name:"salad", productType: "Groceries", price: 0.5})
// throws: "salad" is not equal to "Salad"

cart.remove({name:"Salad", productType: "Groceries", price: 0.5})
console.log(cart.getInfo());
/* prints
{
    totalPrice: 2.5
    products: [{
        name: "Salad",
        totalPrice: 0.5,
        quantity: 1
    }, {
       name: "Shokolad Milka",
       totalPrice: 2,
       quantity: 1 
    }]
}
*/
```
