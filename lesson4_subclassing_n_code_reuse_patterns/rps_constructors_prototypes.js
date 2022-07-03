// Rock paper scissors is a game where each player chooses 
// a move(rock, paper, scissors) independently.  
// If they made the same choice it's a tie.  
// Otherwise, rock beats scissors beats paper beats rock.

// Significant nouns: Game, player, move
// Significant verbs: Choose


const assert = require('assert'); //must require the assert


// The main game loop
function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
}

Game.prototype.play = function play() {
  console.log("Welcome to RPS!");

  this.player1.choose();
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


// Player and its subtypes
function Player(name) {
  this.name = name;
  this.move = null;
}

Player.prototype.choose = function() {
  throw Error('Should be implemented in subclass');
}

// Computer
function Computer() {
  Computer.n_computers += 1;
  Player.call(this, `computer${Computer.n_computers}`);
}
Computer.n_computers = 0;
Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.choose = function () {
  this.move = Move.getRandomMove();
}

// Human
function Human() {
  Human.n_humans += 1;
  Player.call(this, `Human${Human.n_humans}`);
}
Human.n_humans = 0;
Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

Human.prototype.choose = function () {
  this.move = Move.getMoveFromUser();
}


// Moves.
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
function Move(rps) {
  assert([ROCK, PAPER, SCISSORS].includes(rps));
  this.rps = rps;
}

Move.prototype.ties = function (move) {
  return this.rps === move.rps;
}
Move.prototype.beats = function (move) {
return { [ROCK]: SCISSORS, [SCISSORS]: PAPER, [PAPER]: ROCK }[this.rps] === move.rps;
}
// Move.getRock() {}
// Move.getPaper() {}
// Move.getScissors() {}
Move.getRandomMove = function () {
  const move = new Move([ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)])
  // console.log(move);
  return move;
}
Move.getMoveFromUser = function(username) {
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


// Run Program
let game = new Game(new Computer(), new Human());
game.play();