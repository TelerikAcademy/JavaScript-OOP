(function () {
    "use strict";
    console.log("##Map Set");

    // Sets
    var s = new Set();
    s.add("hello").add("goodbye").add("hello");

    console.log(s.size === 2);
    console.log(s.has("hello"));

    // Maps
    var m = new Map();
    m.set("hello", 42);
    m.set(s, 34);
    console.log(m.get(s) == 34);

    // Weak Maps
    var wm = new WeakMap();
    wm.set(s, {extra: 42});
    console.log(wm.size === undefined);

    // Weak Sets
    var ws = new WeakSet();
    ws.add({data: 42});
    console.log(ws.size === undefined);
    // Because the added object has no other references, it will not be held in the set

})();
