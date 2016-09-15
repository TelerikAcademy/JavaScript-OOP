/* globals console setTimeout document */

const selector = "printing-div",
    printerDiv = document.getElementById(selector);

let asyncOperations = {
    asyncOperation(t) {
        setTimeout(function() {
            printerDiv.innerHTML += "<h1>It works</h1>";
        }, t);
    },
    asyncOperationFunc(func, t) {
        setTimeout(function() {
            func();
        }, t);
    },
    asyncOperationFuncPromise(t) {
        let promise = new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, t);
        });
        return promise;
    }
};

asyncOperations.asyncOperationFuncPromise(1000)
    .then(function() {
        printerDiv.innerHTML += "<h1>1. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(1000)
    })
    .then(function() {
        printerDiv.innerHTML += "<h1>2. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(1000)
    })
    .then(function() {
        printerDiv.innerHTML += "<h1>3. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(2500)
    })
    .then(function() {
        printerDiv.innerHTML += "<h1>4. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(1000)
    })
    .then(function() {
        printerDiv.innerHTML += "<h1>5. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(1000)
    })
    .then(function() {
        printerDiv.innerHTML += "<h1>6. It works with Promise</h1>";
        return asyncOperations.asyncOperationFuncPromise(1000)
    });

// asyncOperations.asyncOperationFunc(function() {
//     printerDiv.innerHTML += "<h1>1. It works</h1>";
//     asyncOperations.asyncOperationFunc(function() {
//         printerDiv.innerHTML += "<h1>2. It works</h1>";
//         asyncOperations.asyncOperationFunc(function() {
//             printerDiv.innerHTML += "<h1>3. It works</h1>";
//             asyncOperations.asyncOperationFunc(function() {
//                 printerDiv.innerHTML += "<h1>4. It works</h1>";
//                 asyncOperations.asyncOperationFunc(function() {
//                     printerDiv.innerHTML += "<h1>5. It works</h1>";
//                     asyncOperations.asyncOperationFunc(function() {
//                         printerDiv.innerHTML += "<h1>6. It works</h1>";
//                     }, 1000);
//                 }, 1000);
//             }, 1000);
//         }, 2000);
//     }, 1000);
// }, 1000);
