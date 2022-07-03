
// console.log(typeof {});
// console.log(typeof []);
// console.log(typeof (a => a ** 2));

// console.log(global);
// console.log(global.isNaN);

// console.log(global.ksidfo);
// ksidfo = "yoyo";
// console.log(global.ksidfo);


// function foo() {
//   console.log("this refers to: " + this);
// }

// foo();
// // this refers to: [object global]


console.log(`\n --------------- Execution Context ---------------`);
// let foo = {
//   bar: function () {
//     console.log(this);
//   }
// };

// foo.bar();              // `foo` is the implicit execution context for `bar`
//                         // { bar: [Function: bar] }
// let baz = foo.bar;
// baz();                  // global {global: global, queueMicrotask: ƒ, clearImmediate: ƒ, setImmediate: ƒ, structuredClone: ƒ, …}


console.log(`\n --------------- Explicit Execution Context ---------------`);
// function logNum(that) {
//   console.log(`${this.num} and ${that}`);
// }

// let obj = {
//   num: 42
// };

// logNum("that");           
// logNum.call(obj, "that"); 


console.log(`\n --------------- problems 5 ---------------`);
let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add: function (extra=5) {
    return this.a + this.b + extra;
  },
};

console.log(bar.add.call(foo));

let bf = bar.add.bind(foo);
console.log(bf(10));


I'm finding the following code difficult to understand.  Doesn't the method `bind` take in only a single argument ? Shouldn't the inner function (which is returned) accept the rest of the arguments?  This is certainly how .bind() seems to work...

Function.prototype.bind = function (...args) {
  let fn = this;
  let context = args.shift();

  return function () {
    return fn.apply(context, args);
  };
