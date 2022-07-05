// Let's begin by writing a textual description of the game.

// Twenty - One is a card game with a dealer and a player.
// The participants try to get as close to 21 points as possible without going over.
// The game starts by dealing cards from a 52 - card deck consisting of cards from 4 suits of 13 ranks each.
// Both participants receive two cards.
  // The dealer hides one of his cards(places it face - down) so that the player can't see what it is.
  // The player can see both of her cards.

// The player takes the first turn, and can hit or stay.
  // If the player hits, she gets another card, and again has the opportunity to hit(get another card) or stay.
  // If the player goes over 21 points, she busts.
  // If the player stays, the dealer plays next.

// If the player didn't bust, it's now the dealer's turn.
  // The dealer reveals his face-down card.
  // If the dealer's total points are less than 17, he must hit and receive another card.
  // If the dealer goes over 21 points, he busts.
  // If the dealer has 17 points or more, he must stay.

  // Results of the game are determined.

// SIGNIFICANT NOUNS
  // game
  // participant - a common supertype of this and player?
  // dealer
  // player
  // deck
  // card
  // hand - made this up to refer to the player/dealer's cards


// SIGNIFICANT VERBS
  // dealing
  // hit or stay
  // bust
  // reveal - dealer shows a card

// SIGNIFICANT WORDS TOGETHER
  // game
    // Welcome the player to the game
    // When the program starts, give the player 5 dollars with which to bet.Deduct 1 dollar each time she loses, and add 1 dollar each time she wins.The program should quit when she is broke(0 dollars) or rich(has a total of 10 dollars).

    // Each time the player has an opportunity to hit or stay:
      // Display the computer's hand; one card should remain hidden.
      // Display the player's hand and her point total.
      // For the dealer's turn:

    // The dealer doesn't play at all if the player busts.
      // Display the dealer's hand, including the hidden card, and report his point total.
      // Redisplay the dealer's hand and point total and each time he hits.

    // Display the results when the dealer stays.
    // After each game is over, ask the player if they want to play again.Start a new game if they say yes, else end the game.

    // Be prepared to run out of cards.You can either create a new deck for each game, or keep track of how many cards remain and create a new deck as needed.

    // say good bye when they quit.
  // participant - a common supertype of this and player?
  // dealer
    // override 'hits'
  // player
    // override 'hits'
  // deck
    // drawCard
  // card
    // getValue21()
    // isAce()
  // hand - made this up to refer to the player/dealer's cards
    // Maybe just implement this inside participant?


// SIGNIFICANT VERBS
  // dealing
  // hit or stay
  // bust
  // reveal - dealer shows a card


const readline = require('readline-sync');
  
PLAYER_STARTING_MONEY = 5

const CARD_TYPES = ["club", "diamond", "heart", "spade"];
const CARD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

const MAX_POINTS = 21;
const DEALER_MIN_POINTS = 17;



function wouldYouLikeToXAgain(whatToDoAgain) {
  while (true) {
    let ans = readline.question(`Would you like to ${whatToDoAgain} again? (y)es or (n)o: `).toLowerCase();
    if (['y', 'yes'].includes(ans)) {
      return true
    }
    if (['n', 'no'].includes(ans)) {
      return false
    }
    console.log('Invalid answer, please try again');
  }
}


class Card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }

  toString() {
    return `${this.number}(${this.type})`
  }

  isFaceCard() {
    return ["jack", "queen", "king"].includes(this.number);
  }

  isAce() {
    return this.number === 1;
  }

  getValue21() {
    if (this.isFaceCard()) {
      return 10;
    }
    return this.number;
  }
}


function shuffle(arr) {
  for (let ind = arr.length - 1; ind > 0; ind--) {
    let randInd = Math.floor(Math.random() * (ind + 1));
    [arr[ind], arr[randInd]] = [arr[randInd], arr[ind]];
  }
}

class Deck {
  constructor() {
    this.cards = [];
    for (const type of CARD_TYPES) {
      for (const number of CARD_NUMBERS) {
        this.cards.push(new Card(type, number));
      }
    }
    shuffle(this.cards);
  }
  drawCard() {
    return this.cards.pop();
  }
}


class Participant {
  constructor(name) {
    this.cards = [];
    this.name = name;
  }

  toString() {
    let str = `${this.name} (score=${this.score()}): `;
    str += this.cards.map(card => card.toString()).join(', ')
    return str
  }
  
  hits() {
    throw Error('Implement in subclass!');
  }

  addCard(card) {
    this.cards.push(card);
  }

  isBust() {
    return this.score() > MAX_POINTS;
  }

  score() {
    let sum = this.cards.reduce((pv, card) => pv + card.getValue21(), 0);
    if (sum <= MAX_POINTS - 10 && this.hasAnAce()) {
      sum += 10;
    }
    return sum;
  }

  hasAnAce() {
    return this.cards.filter(card => card.isAce()).length > 0;
  }

  resetForNewRound() {
    this.cards = [];
  }
}


class Dealer extends Participant {
  static MIN_POINTS = DEALER_MIN_POINTS
  constructor() {
    super('Dealer', null);
  }

  hits() {
    if (this.score() < Dealer.MIN_POINTS) {
      return true;
    }
    return false;
  }
}

class Player extends Participant {
  constructor(name, money) {
    super('Player');
    this.money = money;
    this.isRichThreshold = 2 * money;
  }

  adjustMoney(amt) {
    this.money += amt;
  }

  isBroke() {
    return this.money <= 0;
  }

  isRich() {
    return this.money >= this.isRichThreshold;
  }

  playAgain() {
    return true;
  }
}


class PlayerHuman extends Player {
  hits() {
    return wouldYouLikeToXAgain('hit');
  }

  playAgain() {
    console.log('');
    return wouldYouLikeToXAgain('PLAY');
  }
}

class PlayerComputer extends Player {
  hits() {
    if (this.score() < 15) {
      return true;
    }
    return false;
  }
}


class TOGame {
  constructor(player) {
    this.deck = new Deck();
    this.dealer = new Dealer('Dealer');
    // When the program starts, give the player 5 dollars with which to bet.Deduct 1 dollar each time she loses, and add 1 dollar each time she wins.The program should quit when she is broke(0 dollars) or rich(has a total of 10 dollars).
    this.player = player;
  }

  play() {
    // Welcome the player to the game
    console.log('Welcome to Twenty-One!');

    while (true) {      
      this.playOneRound();
      this.player.adjustMoney(this.playerWonRound() ? 1 : -1);

      // Display the results when the game is over.
      if (this.playerWonRound()) {
        console.log(`\n\n!!! Congratulations ${this.player.name} won this round! !!!`);
      } else {
        console.log(`\n\n!!! ${this.dealer.name} won this round !!!`);
      }
      this.logGameState();

      console.log(`You have $${this.player.money}`);
      if (this.player.isBroke()) {
        console.log('You ran out of money');
        break;
      }
      if (this.player.isRich()) {
        console.log("You're rich!  Congratulations!\n ${}");
        break;
      }

      // After each game is over, ask the player if they want to play again.  Start a new game if they say yes, else end the game.
      if (!this.player.playAgain()) {
        break;
      }
    }

    // say good bye when they quit.
    console.log('Thank-you for playing Twenty-One!');
  }

  playOneRound() {
    console.log('\n\n===== Playing a New Round of Twenty-One! =====');
    
    this.dealer.resetForNewRound()
    this.player.resetForNewRound()
    // Be prepared to run out of cards.You can either create a new deck for each game, or keep track of how many cards remain and create a new deck as needed.
    this.deck = new Deck();

    this.dealer.addCard(this.deck.drawCard());
    this.player.addCard(this.deck.drawCard());
    this.player.addCard(this.deck.drawCard());

    // Each time the player has an opportunity to hit or stay:
    // Display the computer's hand; one card should remain hidden.
    // Display the player's hand and her point total.
    // For the dealer's turn:
    for (const participant of [this.player, this.dealer]) {
      while (true) {
        this.logGameState();
        if (!participant.hits()) {
          break
        }
        participant.addCard(this.deck.drawCard());
        console.log(`${participant.name} hit`);
        if (participant.isBust()) {
          console.log(`${participant.name} busted`);
          console.log(`${participant}`);
          return
        }
      }
    }

    // The dealer doesn't play at all if the player busts.
    // Display the dealer's hand, including the hidden card, and report his point total.
    // Redisplay the dealer's hand and point total and each time he hits.
  }

  logGameState() {
    console.log('\n --- Game State: ---');
    console.log(`${this.dealer}`);
    console.log(`${this.player}`);
  }

  playerWonRound() {
    if (this.player.isBust()) return false;
    if (this.dealer.isBust()) return true;
    return this.player.score() > this.dealer.score();
  }
}


// let game = new TOGame(new PlayerComputer('ComputerPlayer', PLAYER_STARTING_MONEY));
let game = new TOGame(new PlayerHuman('HumanPlayer', PLAYER_STARTING_MONEY));
game.play();