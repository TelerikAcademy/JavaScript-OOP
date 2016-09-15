/* globals console setTimeout document */


function* idGenerator() {
    let lastId = 0;
    while (true) {
        yield lastId += 1;
    }
}


// let idGen1 = idGenerator();
// let idGen2 = idGenerator();

// console.log(idGen1.next());
// console.log(idGen1.next());
// console.log(idGen1.next());

// console.log(idGen2.next());


// function* fibGenerator() {
//     let prev = 1,
//         current = 0;

//     while (true) {
//         yield current;
//         [prev, current] = [current, prev + current];
//     }
// }

// let fib = fibGenerator();
// let fib2 = fibGenerator();

// for (let i = 0; i < 5; i += 1) {
//     console.log(fib.next());
//     console.log(fib2.next());
// }

// let index = 0;
// for (let fibNumber of fibGenerator()) {
//     if (index > 10) {
//         break;
//     }
//     console.log(fibNumber);
//     index += 1;
// }


function* genFunc() {
    let name = "[INITIAL]";
    let name2 = "";
    while (true) {
        name = yield name
    }
}

let f = genFunc();

f.next();

console.log(f.next(["John", "Gosho"]));
console.log(f.next("Doe"));
console.log(f.next("Doe2"));