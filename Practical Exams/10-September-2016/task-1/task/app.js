/* globals require console*/

"use strict";

let { ShoppingCart, Product } = require("./task-2")();

let sc = new ShoppingCart();


let p = new Product("food", "Bread", "1");

sc.add(new Product("beverages", "Whiskey", "25"));

sc.add(p);
sc.add(p);
sc.add(p);
sc.add(p);

console.log(sc.showCost());
console.log(sc.showProductTypes());

console.log(sc.getInfo());

sc.remove(p);

console.log(sc.getInfo());