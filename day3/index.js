"use strict";
// third number after ():number is the return type of the function 
Object.defineProperty(exports, "__esModule", { value: true });
function sum(n1, n2) {
    return n1 + n2;
}
const res = sum(4, 5);
console.log(res);
function callBack(fn) {
    setTimeout(fn, 3000);
}
callBack(function () {
    console.log("callback using setTimeOut");
});
//# sourceMappingURL=index.js.map