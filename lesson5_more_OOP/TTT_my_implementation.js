const assert = require('assert'); //must require the assert

const readline = require('readline-sync');


function joinOr(arr, separator = ', ', or = 'or') {
  if (arr.length === 0) {
    return "";
  } else if (arr.length === 1) {
    return arr[0].toString();
  }
  const start = arr.slice(0, -1).join(separator);
  return start + separator + or + ' ' + arr[arr.length - 1];
}
// console.log(joinOr([1, 2, 3]));               // => "1, 2, or 3"
// console.log(joinOr([1, 2, 3], '; '));         // => "1; 2; or 3"
// console.log(joinOr([1, 2, 3], ', ', 'and'));  // => "1, 2, and 3"
// console.log(joinOr([]));                      // => ""
// console.log(joinOr([5]));                     // => "5"
// console.log(joinOr([1, 2]));                  // => "1 or 2"


class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = null;
    
    this.setMarker(marker);
  }

  getMarker() {
    return this.marker
  }

  setMarker(marker) {
    assert([Square.UNUSED_SQUARE, Square.HUMAN_MARKER, Square.COMPUTER_MARKER].includes(marker));
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  displayWithClear() {
    console.clear();
    this.display();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  unusedSquares() {
    return Object.keys(this.squares).filter(key => {
      return this.squares[key].isUnused();
    })
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],            // top row of board
    ["4", "5", "6"],            // center row of board
    ["7", "8", "9"],            // bottom row of board
    ["1", "4", "7"],            // left column of board
    ["2", "5", "8"],            // middle column of board
    ["3", "6", "9"],            // right column of board
    ["1", "5", "9"],            // diagonal: top-left to bottom-right
    ["3", "5", "7"],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOnce();
      if (!this.playAgain()) {
        break;
      }
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  playOnce() {
    this.board = new Board();
    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      console.clear()
    }
    this.displayResults();
  }

  playAgain() {
    while (true) {
      let ans = readline.question('Would you like to play again? (y)es or (n)o').toLowerCase();
      if (['y', 'yes'].includes(ans)) {
        return true
      }
      if (['n', 'no'].includes(ans)) {
        return false
      }
      console.log('Invalid answer, please try again');
    }
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    console.clear()
    this.board.display();
    if (this.isWinner(this.human)) {
      console.log("Congrats, you won!");
    } else if (this.isWinner(this.computer)) {
      console.log("The computer won");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = readline.question(`Choose a square (${joinOr(validChoices, ', ')}): `);

      if (validChoices.includes(choice)) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }
  
  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();