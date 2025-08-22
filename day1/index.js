class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area() {
        const area = this.width * this.height;
        return area;
    }
    paint() {
        console.log(`Color of the reactangle is ${this.color}`);
    }
}

// making the object of the class given above 
const rect = new Rectangle(2, 3, "red");

const areaOfRect = rect.area();
rect.paint();
console.log(areaOfRect);
// console.log(colorOfRect);