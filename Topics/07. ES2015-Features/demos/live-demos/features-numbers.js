/* globals console setTimeout document */


let dec = 123,
    hex = 0x123, //1*16^2 + 2* 16 + 3 = 256 + 32 + 3 = 291
    oct = 0o123, //1*8^2 + 2*8 + 3 = 83
    bin = 0b1010; // 12

console.log(`Dec: ${dec}`);
console.log(`Hex: ${hex}`);
console.log(`Oct: ${oct}`);
console.log(`Bin: ${bin}`);