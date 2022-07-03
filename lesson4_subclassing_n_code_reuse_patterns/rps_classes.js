// Rock paper scissors is a game where each player chooses 
// a move(rock, paper, scissors) independently.  
// If they made the same choice it's a tie.  
// Otherwise, rock beats scissors beats paper beats rock.

// Significant nouns: Game, player, move
// Significant verbs: Choose


const assert = require('assert'); //must require the assert


// The main game loop
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  play() {
    console.log("Welcome to RPS!");

    console.log("1");
    this.player1.choose();
    console.log("2");
    this.player2.choose();

    console.log(`${this.player1.name} chose ${this.player1.move.rps}`);
    console.log(`${this.player2.name} chose ${this.player2.move.rps}`);
    if (this.player1.move.ties(this.player2.move)) {
      console.log(`It's a tie!`);
    } else if (this.player1.move.beats(this.player2.move)) {
      console.log(`${this.player1.name} wins!`);
    } else {
      assert.equal(this.player2.move.beats(this.player1.move), true);
      console.log(`${this.player2.name} wins!`);
    }

    console.log("Thank-you for playing RPS!");
  }
}


// Player and its subtypes
class Player {
  constructor(name) {
    this.name = name;
    this.move = null;
  }
  choose() {
    throw Error('Should be implemented in subclass');
  }
}

// Computer
class Computer extends Player {
  static n_computers = 0;

  constructor() {
    Computer.n_computers += 1;
    super(`Computer${Computer.n_computers}`)
  }
  
  choose() {
    this.move = Move.getRandomMove();
  }
}

// Human
class Human extends Player {
  static n_humans = 0;
  constructor() {
    Human.n_humans += 1;
    super(`Human${Human.n_humans}`);
  }

  choose() {
    this.move = Move.getMoveFromUser();
  }
}


// Moves.
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
class Move {
  constructor(rps) {
    assert([ROCK, PAPER, SCISSORS].includes(rps));
    this.rps = rps;
  }

  ties(move) {
    return this.rps === move.rps;
  }

  beats(move) {
    return { [ROCK]: SCISSORS, [SCISSORS]: PAPER, [PAPER]: ROCK }[this.rps] === move.rps;
  }

  static getRandomMove() {
    return new Move([ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)]);
  }

  static getMoveFromUser(username) {
    const readLineSync = require('readline-sync');
    while (true) {
      const choice = readLineSync.question('Please choose a move: (r)ock, (p)aper, or (s)cissors: ')
      const choiceMap = {
        r: ROCK,
        rock: ROCK,
        p: PAPER,
        paper: PAPER,
        s: SCISSORS,
        scissors: SCISSORS,
      }
      if (choice in choiceMap) {
        return new Move(choiceMap[choice]);
      }
      console.log(`[${choice}] not recognized as a valid choice, please try again`);
    }
  }
}


// Run Program
// let game = new Game(new Computer(), new Computer());
let game = new Game(new Computer(), new Human());
game.play();