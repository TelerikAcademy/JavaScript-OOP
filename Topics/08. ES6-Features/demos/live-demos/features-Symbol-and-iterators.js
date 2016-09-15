/* globals console setTimeout document */


// class DataStorage {
//     constructor() {
//         this._items = [];
//     }

//     add(item) {
//         this._items.push(item);
//         return this;
//     }

//     [Symbol.iterator]() {
//         let index = -1;
//         return {
//             next: () => {
//                 index += 1;
//                 let isDone = false;
//                 if (index >= this._items.length) {
//                     isDone = true;
//                 }

//                 return {
//                     value: this._items[index],
//                     done: isDone
//                 };
//             }
//         };
//     }
// }

// let ds = new DataStorage();
// ds.add(3);
// ds.add(1);
// ds.add(2);
// ds.add(999);

// for (let item of ds) {
//     console.log(item);
// }



let fib = {
    [Symbol.iterator]() {
        let prev = 1,
            current = 0;

        return {
            next() {
                let valueToReturn = {
                    value: current,
                    done: false
                };
                [prev, current] = [current, prev + current];
                return valueToReturn;
            }
        };
    }
};

let index = 0;

for (let fn of fib) {
    if (index >= 100) {
        break;
    }
    index += 1;

    console.log(fn);
}