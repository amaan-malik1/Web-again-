interface People {
    name: string;
    age: number;
    // greet: () => {};
}

let person: People = {
    name: "Amaan Malik",
    age: 22,
    // greet() {
    //     return "hiii";
    // },
}

class Manager implements People {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

let user1 = new Manager("Amaan ", 32)
console.log(user1.name);
