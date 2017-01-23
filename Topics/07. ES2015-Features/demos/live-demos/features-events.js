/* globals console setTimeout document */

document.getElementById("declation-btn")
    .addEventListener("click", (function(ev) {
        console.log(this);
    }).bind(this));


//this
document.getElementById("arrow-btn")
    .addEventListener("click", (ev) => {
        console.log(this);
    });