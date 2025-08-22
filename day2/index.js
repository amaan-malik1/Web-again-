function setTimeoutPromisified(ms) {
    return new Promise(res => setTimeout(res, ms))
}

function callBackFn() {
    console.log("After some time");
}

setTimeoutPromisified(3000).then(callBackFn);