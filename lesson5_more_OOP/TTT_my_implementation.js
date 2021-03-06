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
    console.log(`key: ${key}`);    
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

  getMarkersIn(marker, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === marker;
    });
    return markers
  }
  
  countMarkersIn(marker, keys) {
    return this.getMarkersIn(marker, keys).length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.nWins = 0;
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
  static MATCH_GOAL = 3;

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    let humanStarts = true;

    while (true) {
      this.playOnce(humanStarts);
      humanStarts = !humanStarts;

      if (this.human.nWins === TTTGame.MATCH_GOAL) {
        console.log(`Congratulations, you won the match!`);
        break;
      }
      if (this.computer.nWins === TTTGame.MATCH_GOAL) {
        console.log(`Unfortunately, you lost the match!`);
        break;
      }
      if (!this.playAgain()) {
        break;
      }
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  playOnce(humanStarts) {
    let humansMove = humanStarts;
    this.board = new Board();

    while (true) {

      if (humansMove) {
        this.board.display();
        this.humanMoves();
        console.clear()
      } else {
        this.computerMoves();        
      }

      humansMove = !humansMove
      if (this.gameOver()) break;
    }
    this.updateMatchTally();
    this.displayResults();
  }

  playAgain() {
    while (true) {
      let ans = readline.question('Would you like to play again? (y)es or (n)o: ').toLowerCase();
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

  updateMatchTally() {
    if (this.isWinner(this.human)) {
      this.human.nWins += 1;
    } else if (this.isWinner(this.computer)) {
      this.computer.nWins += 1;
    }
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
    console.log(`The match tally is currently human:${this.human.nWins} to computer:${this.computer.nWins}`);
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
    this.board.markSquareAt(this.computerGetChoice(), this.computer.getMarker());
  }

  computerGetChoice() {
    let validChoices = this.board.unusedSquares();
    let choice;

    choice = this.computerGetOffensiveChoice();
    if (choice) {
      return choice;
    }

    choice = this.computerGetDefensiveChoice();
    if (choice) {
      return choice;
    }

    if (validChoices.includes('5')) {
      return '5';
    }

    // Return a random move otherwise
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    return choice
  }

  computerGetOffensiveChoice() {
    return this.getStrategicChoice(this.computer.getMarker());
  }

  computerGetDefensiveChoice() {
    return this.getStrategicChoice(this.human.getMarker());
  }

  /**
   * Looks at all possible rows.  If a row contains two markers equal to `marker` and one empty square, the key of the empty square is returned.
   * @param {string} marker character
   * @returns null | string - If non-null returns the key (i.e. '3') of the strategic choice
   */
  getStrategicChoice(marker) {
    for (const row of TTTGame.POSSIBLE_WINNING_ROWS) {
      if (this.board.countMarkersIn(marker, row) === 2 && this.board.countMarkersIn(Square.UNUSED_SQUARE, row) === 1) {
        return this.board.getMarkersIn(Square.UNUSED_SQUARE, row)[0];
      }
    }
    return null;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersIn(player.getMarker(), row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();