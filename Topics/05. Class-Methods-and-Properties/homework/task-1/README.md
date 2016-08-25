# Linked list
- Implement a **linked list** using **ES6 classes**. Use two classes - `LinkedList` and `listNode`. Look at the hints at the bottom of the description. Your class implementation should:

### Getters
- have a getter `first` - return the value of the first node in the list
- have a getter `last` - return the value of the last node in the list
- have a getter `length` for the length of the linked list

### Methods
- provide a method `append(el1, el2, el3...)` that adds the provided elements to the end of the list
    - should enable chaining

```js
const list = new LinkedList();
list.append(1, 2, 3).append(4);
// list should contain 1, 2, 3 and 4
```

- provide a method `prepend(el1, el2, el3...)` that adds the provided elements to the beggining of the list
    - should enable chaining

```js
const list = new LinkedList();
list.append(4, 5, 6).prepend(1, 2, 3);
// should contain 1, 2, 3, 4, 5, 6 in that order
```

- provide a method `insert(index, el1, el2, el3...)` for inserting values at the specified index
    - should enable chaining

```js
const list = new LinkedList();
list.append(1, 4, 5).insert(1, 2, 3);
// list should contain 1, 2, 3, 4, 5
```

- provide a method `at(index[, value])` for indexing
    - when passed an **index**, it should return the element at that **index**
    - when passed an **index** and a **value**, should change the value of the element at that index

```js
const list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);
console.log(list.at(2)); // 3

list.at(2, 'gosho');
console.log(list.at(2)); // gosho
```

- provide a method `removeAt(index)` that removes an element at a given index
    - should return the removed element

```js
const list = new LinkedList();

const removed = list.append(1, 2, 3, 4, 5).removeAt(1);
// removed should be 2
// the list should contain 1, 3, 4, 5
```

- your class should be **iterable with a for-of loop**
    - you must use `Symbol.iterator`

```js
class LinkedList {
    /* 
        other code here
    */

    * [Symbol.iterator] {
        // iterator code
    }
}

const list = new LinkedList().append(6, 7, 8).prepend(1, 2, 3, 4, 5);

for(const value of list) {
    console.log(value);
}
// output should be the numbers [1..8], each on a separate line
```

- provide a `toArray()` method, that converts the linked list to an array

```js
const list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);

const arr  = list.toArray();
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(arr instanceof Array); // true
```

- provide method `toString()`, which should return a string representation of the linked list - the values of the elements, separated by **' -> '**

```js
const list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);

console.log(list.toString()); // 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

#### Hints
- Read about the linked list data structure on the internet.
    - You can watch [this video](https://youtu.be/WmwuLvxqmac?t=394).
    - You can try reading [this article](https://www.nczonline.net/blog/2009/04/13/computer-science-in-javascript-linked-list/).
    - Research on your own :)
- Read about chaining in programming and fluent interfaces.
- The **[spread operator](https://rainsoft.io/how-three-dots-changed-javascript/)**(`...`) might help you a bit with arguments.
- Implementing **for-of** [iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) first will help you with implementing `toArray` and `toString`.
    - Research ES2016 generator functions.
    - Research how to make an object iterable.
- Try to reuse already implemented functionalities. Implemented iteration can be used for `toArray`. `toArray` can be used for `toString`. You can also reuse code between `append`, `prepend` and `insert`.

#### Running the tests locally
- Run `npm install` in this directory to download the dependencies in `package.json`(mocha and chai).
- Run `npm test` to run the tests.