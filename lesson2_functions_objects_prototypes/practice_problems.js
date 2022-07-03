console.log(`\n ===================== Problems from https://launchschool.com/lessons/1eaf5e37/assignments/f7b8620b ===================== `);


console.log(`\n --------------- 4 ---------------`);
// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

// function assignProperty(obj, prop, val) {
//   if (obj.hasOwnProperty(prop)) {
//     obj[prop] = val;
//   } else if (Object.getPrototypeOf(obj)) {
//     assignProperty(Object.getPrototypeOf(obj), prop, val);
//   }
// }


console.log(`\n --------------- 5 ---------------`);
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
fooB.buz = 5;
for (let property in fooB) {
  console.log(`${property}: ${fooB[property]}`);
}
console.log('-------');
Object.keys(fooB).forEach(property => {
  console.log(`${property}: ${fooB[property]}`);
});

