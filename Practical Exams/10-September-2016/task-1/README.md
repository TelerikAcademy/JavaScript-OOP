# Carts and Products

-   Implement a functionality to serve a Shopping Center
    -   Export a class **`Product`**
    -   Export a class **`ShoppingCart`**

#   Classes and functionality:

###  `Product`

-   Has the following methods and properties
    -   `constructor`
        -   **Parameters**
            -   `productType`
            -   `name`
            -   `price`
        -   _Example_:
            -   `new Product("Sweets", "Shokolad Milka", 2)`;
    -   **Public properties**:
        -  `productType`: `String`
        -  `name`: `String`
        -  `price`: `Number`

###  `ShoppingCart`

-   Has the following methods and properties
    -   `constructor`
        -   **Parameters**
            -   No parameters
        -   _Example_: 
            -   `new ShoppingCart()`;
    -   **Public properties**:
        -  `products`: `Array`
    -   **Public methods**:
        -   `add(product)`
            -   **Parameters**:
                -   A `Product` or Product-like object
            -   **Behavior**:
                -   Adds the `product` to the `products` array in this `ShoppingCart` instance
                -   A product can be added many times into the same `ShoppingCart` instance
                -   Should provide chaining
        -   `remove(product)`
            -   **Parameters**
                -   a `Product` or Product-like object
            -   **Behavior**:
                -   Removes the left-most object from the `products` array in this `ShoppingCart` instance, that has the same `name`, `price` and `productType`
            -   **Throws** when:
                -   The `ShoppingCart` instance does not contain this product
                -   There are not products in the `ShoppingCart` instance
        -   `showCost()`
            -   **Parameters**
                -   No parameters
            -   **Behavior**:
                -   Returns the sum from the costs of all products in this `ShoppingCart` instance
                -   Returns `0` when there are no products in this `ShoppingCart` instance
        -   `showProductTypes()`
            -   **Parameters**
                -   No parameters
            -   **Behavior**:
                -   Returns the **unique productTypes** of the products added to this `ShoppingCart` instance
                    -   The returned product types must be **sorted alphabetically**
                -   Returns an empty array when there are no products in this `ShoppingCart` instance
        -   `getInfo()`
            -   **Parameters**
                -   No parameters
            -   **Behavior**:
                -   Returns an object containing information about the products in this `ShoppingCart` instance. The returned object has two properties:
                    -   `products`: Groups products by their name
                        -   For each unique product name there creates an element:
                            -   The `name` of the products
                            -   Their total cost
                            -   The quantity of products with this name in the `ShoppingCart` instance
                    -   `totalPrice`: The total price of all products in this `ShoppingCart` instance
                -   Returns an object with `totalPrice` equal to `0` and `products` - an empty array, when no products in this `ShoppingCart` instance

#   Solution template

```javascript

function solve(){
    class Product{
        /* .... */
    }

    class ShoppingCart {
        /* .... */
    }
    return {
        Product, ShoppingCart
    };
}
```

#   Example usage:

```javascript
let {Product, ShoppingCart} = solve();

let cart = new ShoppingCart();

let pr1 = new Product("Sweets", "Shokolad Milka", 2);
cart.add(pr1);
console.log(cart.showCost());
//prints `2`

let pr2 = new Product("Groceries", "Salad", 0.5);
cart.add(pr2);
cart.add(pr2);
console.log(cart.showCost());
//prints `3`

console.log(cart.showProductTypes());
//prints ["Sweets", "Groceries"]

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
//throws: "salad" is not equal to "Salad"

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