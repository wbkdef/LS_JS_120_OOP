console.log(`\n ----------------------- Rectangles ----------------------- `);

// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }
  
//   getWidth() { return this.width; }
//   getLength() { return this.length; }
//   getArea() { return this.width * this.length; }
// }

// let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20


console.log(`\n ----------------------- Rectangles and Squares ----------------------- `);
// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() {
//     return this.width;
//   }

//   getLength() {
//     return this.length;
//   }

//   getArea() {
//     return this.width * this.length;
//   }
// }

// class Square extends Rectangle {
//   constructor(sideLength) {
//     super(sideLength, sideLength);
//   }
// }

// let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); // area of square = 25


console.log(`\n ----------------------- Fake Cat ----------------------- `);
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype); // your implementation
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.


console.log(`\n ----------------------- Complete the Program - Cats! ----------------------- `);
// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, furColor) {
//     super(name, age);
//     this.furColor = furColor;
//   }
//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.furColor} fur.`;
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info());
// console.log(butterscotch.info());
// // My cat Pudding is 7 years old and has black and white fur.
// // My cat Butterscotch is 10 years old and has tan and white fur.


console.log(`\n ----------------------- Fake Cat ----------------------- `);
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype)// your implementation
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.


console.log(`\n ----------------------- Animals ----------------------- `);
// class Animal {
//   constructor(name, age, legs, species, status) {
//     this.name = name;
//     this.age = age;
//     this.legs = legs;
//     this.species = species;
//     this.status = status;
//   }
//   introduce() {
//     return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//   }
// }

// class Cat extends Animal {
//   constructor(name, age, status) {
//     super(name, age, 4, 'cat', status);
//   }
//   introduce() {
//     return `${super.introduce()} Meow meow!`
//   }
// }

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }
//   greetMaster() {
//     return `Hello ${this.master}! Woof, woof!`
//   }
// }

// let cat = new Cat("Pepe", 2, "happy");
// console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// // logs true


console.log(`\n ----------------------- Refactoring Vehicles ----------------------- `);
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }

  getWheels() {
    throw new Error("Base class should implement this method");
    return 4
  }
}

class Car extends Vehicle {
  getWheels() {
    return 4;
  }
}
let car = new Car("volvo", 2020);
console.log(car.info());

class Motorcycle extends Vehicle {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}