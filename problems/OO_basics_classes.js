console.log(`\n ----------------------- Name the Constructor ----------------------- `);
console.log("Hello".constructor.name);
console.log([1, 2, 3].constructor.name);
console.log({ name: 'Srdjan' }.constructor.name);


console.log(`\n ----------------------- Create the Class ----------------------- `);
// class Cat {
//   constructor(name, color='orange') {
//     this.name = name;
//     this.color = color;
//     console.log(`Hello! My name is ${this.name}!`);
//   }
// }
// console.log(new Cat());
// console.log((new Cat()).constructor.name);


console.log(`\n ----------------------- Hello, Sophie! (part 1) ----------------------- `);
// let kitty = new Cat('Sophie');
// console.log(kitty);


console.log(`\n ----------------------- Hello, Sophie! (part 2) ----------------------- `);
// class Cat {
//   constructor(name, color = 'orange') {
//     this.name = name;
//     this.color = color;
//   }
//   greet() {
//     console.log(`Hello! My name is ${this.name}!`);
//   }
// }

// let kitty = new Cat('Sophie');
// console.log(kitty);
// kitty.greet();


console.log(`\n ----------------------- Default Person ----------------------- `);
class Person {
  constructor(name="John Doe") {
    this.name = name;
  }
}
let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe


console.log(`\n ----------------------- Hello, Chloe! ----------------------- `);
// class Cat {
//   constructor(name, color = 'orange') {
//     this.name = name;
//     this.color = color;
//   }
//   greet() {
//     console.log(`Hello! My name is ${this.name}!`);
//   }
//   rename(name) {
//     this.name = name;
//   }
// }
// let kitty = new Cat('Sophie');
// console.log(kitty.name); // Sophie
// kitty.rename('Chloe');
// console.log(kitty.name); // Chloe


console.log(`\n ----------------------- Generic Greeting (part 1) ----------------------- `);
// class Cat {
//   static genericGreeting() {
//     console.log("Hello! I'm a cat!");
//   }
// }

// Cat.genericGreeting();


console.log(`\n ----------------------- Generic Greeting (part 2) ----------------------- `);
class Cat {
  constructor(name) {
    this.name = name;
  }
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();
