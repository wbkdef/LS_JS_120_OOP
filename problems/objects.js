console.log(`\n ----------------------- Buggy Code 1 ----------------------- `);
// function createGreeter(name) {
//   return {
//     name: name,
//     morning: 'Good Morning',
//     afternoon: 'Good Afternoon',
//     evening: 'Good Evening',
//     greet: function (timeOfDay) {
//       let msg = '';
//       switch (timeOfDay) {
//         case 'morning':
//           msg += `${this.morning} ${this.name}`;
//           break;
//         case 'afternoon':
//           msg += `${this.afternoon} ${this.name}`;
//           break;
//         case 'evening':
//           msg += `${this.evening} ${this.name}`;
//           break;
//       }

//       console.log(msg);
//     },
//   };
// }

// let helloVictor = createGreeter('Victor');
// helloVictor.greet('morning');


console.log(`\n ----------------------- Buggy Code 2 ----------------------- `);
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function (percent) {
    let discount = this.price * percent / 100;
    return this.price - discount;
  },
};

console.log(item.discount(20));   // should return 40
// = 40
console.log(item.discount(50));   // should return 25
// = 20
console.log(item.discount(25));   // should return 37.5
// = 15


console.log(`\n ----------------------- Testing Object Equality ----------------------- `);
function objectsEqual(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
console.log(objectsEqual({ a: 'foo' }, { a: 'foo' }));                      // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' }));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 }));  // false


console.log(`\n ----------------------- Student ----------------------- `);
const util = require('util');

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},
    info() { console.log(`${this.name} is a ${this.year} year student`); },
    addCourse(course) { this.courses.push(course); }, 
    listCourses() {
      console.log(util.inspect(this.courses, { showHidden: false, depth: null, colors: true }));
      
      // console.log(this.courses);
    },

    addNote(subjectCode, note) {
      const subjectName = this.getSubjectName(subjectCode);
      this.notes[subjectName] = this.notes[subjectName] || [];
      this.notes[subjectName].push(note);
    },

    updateNote(subjectCode, note) {
      const subjectName = this.getSubjectName(subjectCode);
      this.notes[subjectName] = [];
      this.addNote(subjectCode, note);
    },

    viewNotes() {
      for (const [subjectName, notes] of Object.entries(this.notes)) {
        console.log(`${subjectName}: ${notes.join('; ')}`);
      }
    },

    getSubjectName(subjectCode) {
      const name = this.courses.filter(course => course.code === subjectCode)[0].name;
      return name;
    },


  }
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"