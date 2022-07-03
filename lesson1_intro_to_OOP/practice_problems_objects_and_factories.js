// console.log(`\n ----------------------- 1 ----------------------- `);

// function makeBook(title, author) {
//   return {
//     title,
//     author,
//     getDescription() {
//       return `${this.title} was written by ${this.author}.`
//     }
//   }
// }

// const mythos = makeBook('Mythos', 'Stephen Fry');
// const mtpod = makeBook('Me Talk Pretty One Day', 'David Sedaris');
// const aag = makeBook("Aunts aren't Gentlemen", 'PG Wodehouse');
// console.log(mythos.getDescription());
// console.log(mtpod.getDescription());
// console.log(aag.getDescription());


console.log(`\n ----------------------- 4/5/6 ----------------------- `);

function makeBook(title, author, read=false) {
  return {
    title,
    author,
    read,
    getDescription() {
      const haveHaventRead = this.read ? `I have read it.` : `I haven't read it.`
      return `${this.title} was written by ${this.author}.  ${haveHaventRead}`
    },
    readBook() {
      this.read = true;
    }
  }
}

const mythos = makeBook('Mythos', 'Stephen Fry');
const mtpod = makeBook('Me Talk Pretty One Day', 'David Sedaris');
const aag = makeBook("Aunts aren't Gentlemen", 'PG Wodehouse');

aag.readBook();
console.log(mythos.getDescription());
console.log(mtpod.getDescription());
console.log(aag.getDescription());
