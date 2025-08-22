// third number after ():number is the return type of the function 

function sum(n1: number, n2: number): number {
    return n1 + n2;
}

const res = sum(4, 5);
console.log(res);


function callBack(anotherFn: () => void) {
    setTimeout(anotherFn, 3000)
}

callBack(function () {
    console.log("callback using setTimeOut");

});
