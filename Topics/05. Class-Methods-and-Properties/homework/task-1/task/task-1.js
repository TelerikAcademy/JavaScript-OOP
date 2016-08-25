'use strict';

class Node {
    constructor(value) {
        this.value = value;
    }
}

class LinkedList {
    constructor() {
        this._length = 0;
        return this;
    }

    get first() {
        return this._root.value;
    }

    get last() {
        return this._last.value;
    }

    get length() {
        return this._length;
    }

    append() {
        let self = this;

        [].forEach.call(arguments, function (value) {
            if (self._last) {
                self._last.next = new Node(value);
                self._last = self._last.next;
            } else {
                self._root = self._last = new Node(value);
            }
        });

        self._length += arguments.length;

        return self;
    }

    prepend() {
        for (let i = arguments.length - 1; i >= 0; i -= 1) {

            let newRoot = new Node(arguments[i]);
            newRoot.next = this._root;
            this._root = newRoot;
        }

        this._length += arguments.length;

        return this;
    }

    insert(index, ...values) {
        if (index < 0 || this.length <= index) {
            return;
        }

        if(index === 0) {
            return this.prepend(...values);
        } else if(index === (this._length - 1)) {
            return this.append(...values);
        }
        
        
        let node = this._root;
        for(let i = 0; i < index - 1; i += 1) {
            node = node.next;
        }

        let next = node.next;

        values.forEach(function (val) {
            node.next = new Node(val);
            node = node.next;
        });
        this._length += values.length;

        node.next = next;

        return this;
    } 

    removeAt(index) {
        if (index < 0 || this.length <= index) {
            return;
        }

        this._length -= 1;
        if(index === 0) {
            const removed = this._root.value;
            this._root = this._root.next;
            return removed;
        }

        let toRemove = this._root,
            predecessor;

        for (let i = 0; i < index; i += 1) {
            predecessor = toRemove;
            toRemove = toRemove.next;
        }

        predecessor.next = toRemove.next;

        return toRemove.value;
    }

    at(index, value) {
        if (index < 0 || this.length <= index) {
            return;
        }

        let node = this._root;

        for (let i = 0; i < index; i += 1) {
            node = node.next;
        }

        if(arguments.length === 2) {
            node.value = value;
        }

        return node.value;
    }

    toString() {
        return this.toArray().join(' -> ');
    }

    toArray() {
        let result = [];

        for(const value of this) {
            result.push(value);
        }

        return result;
    }

    * [Symbol.iterator]() {
        let currentNode = this._root;

        while(currentNode) {
            yield currentNode.value;
            currentNode = currentNode.next;
        }
    }
}

module.exports = LinkedList;