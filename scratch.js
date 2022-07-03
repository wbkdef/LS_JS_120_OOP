
// const walkMixin = {
//   walk() {
//     return "Let's go for a walk!";
//   }
// }


// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     return `Hello! My name is ${this.name}!`;
//   }
// }
// Object.assign(Cat.prototype, walkMixin);

// let kitty = new Cat("Sophie");
// console.log(kitty.greet());
// console.log(kitty.walk());


class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() { return this.width; }
  getLength() { return this.length; }
  getArea() { return this.width * this.length; }
}

let rect = new Rectangle(4, 5);
console.log(rect instanceof Rectangle);


console.log(`\n --------------- Search Word (Part 1) ---------------`);
const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
// function searchWord(word, txt) {
//   return txt.toLowerCase().split(' ').filter(wrd => wrd === word.toLowerCase()).length;
// }
function searchWord(word, txt) {
  const re = RegExp(`\\b${word}\\b`, 'gi');
  console.log(re);
  return txt.match(re).length;
}
console.log(searchWord('sed', text));      // 3


console.log(`\n --------------- Accessing and changing prototypes ---------------`);
// let a = { foo: 1, bar: 2, }; 
// let b = Object.create(a);
// let c = { baz: 3, buz: 5, };

// console.log(b);  // {}
// console.log(Object.getPrototypeOf(b));  // {foo: 1, bar: 2}
// Object.setPrototypeOf(b, c);
// console.log(Object.getPrototypeOf(b));  // {baz: 3, buz: 5}

// let a = { foo: 1, bar: 2, };
// let b = Object.create(a);
// let c = { baz: 3, buz: 5, };
// let d = {};
// Object.setPrototypeOf(d, a);

// console.log(b.bar);
// console.log(d.bar);
// d.bar = 9;
// console.log(b.bar);
// console.log(d.bar);
// console.log(b);
// console.log(d);

// console.log(Object.getPrototypeOf({}));


console.log(`\n --------------- Checking the prototype chain ---------------`);
// let a = { foo: 1, bar: 2, };
// let b = Object.create(a);
// let c = { baz: 3, buz: 5, };
// Object.setPrototypeOf(c, b);

// console.log(a.isPrototypeOf(c));


// console.log(global);
// console.log(this);
// console.log(Object.getPrototypeOf(this));
// console.log(a.isPrototypeOf(b));


console.log(`\n --------------- Accessing and changing prototypes ---------------`);
// let a = { foo: 1, bar: 2, };
// let b = Object.create(a);
// let c = { baz: 3, buz: 5, };

// console.log(b);
// console.log(Object.getPrototypeOf(b));
// Object.setPrototypeOf(b, c)
// console.log(Object.getPrototypeOf(b));


console.log(`\n --------------- Own properties 1 ---------------`);
let a = { foo: 1, bar: 2, };
let b = Object.create(a);
b.c = "yo"
for (const bp in b) {
  console.log(`${bp}: ${b[bp]}`);
  if (Object.hasOwnProperty.call(b, bp)) {
    console.log(`${bp}: ${b[bp]}`);
  }
}
console.log('foo' in a);
console.log('foo' in b);

console.log(`\n --------------- Own properties 2 ---------------`);
class SC {
  constructor() {
    this.foo = 8;
  }
}

class SubC extends SC {
  constructor() {
    super();
    this.bar = 11;
  }
  print() {
    console.log(`this.bar: ${this.bar}`);
  }
}
let cls = new SubC();
for (const key in cls) {
  // if (Object.hasOwnProperty.call(cls, key)) {
  if (cls.hasOwnProperty(key)) {
    console.log(`cls[${key}]: ${cls[key]}`);
  } else {
    console.log(`cls[${key}]::: ${cls[key]}`);
  }
}