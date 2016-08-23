/* globals console */

var print = function(message) {
    let doc = this.document;
    if (doc && doc.body) {
        doc.body.innerHTML +=
            `<div class='message'>${message}</div>`;
    } else {
        console.log(message);
    }
};

print(123);

let f3 = function() {
    print("This is f3");
};

let f2 = function() {
    f3();
    print("This is f2");
};

let f1 = function() {
    f2();
    print("This is f1");
};

f1();