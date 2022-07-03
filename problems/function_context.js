console.log(`\n ----------------------- Buggy Code 2 ----------------------- `);

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function () {
    const franchiseObj = this;
    return [1, 2, 3].map(function (number) {
      return franchiseObj.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());