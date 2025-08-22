"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let person = {
    name: "Amaan Malik",
    age: 22,
    // greet() {
    //     return "hiii";
    // },
};
class Manager {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let user1 = new Manager("Amaan ", 32);
console.log(user1.name);
//# sourceMappingURL=index.js.map