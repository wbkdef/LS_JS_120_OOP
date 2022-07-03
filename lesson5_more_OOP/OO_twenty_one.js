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


PLAYER_STARTING_MONEY = 5


class Card {
  constructor(type, number) {
    this.type = type;
    this.number = number;
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
  
  hits() {
    throw Error('Implement in subclass!');
  }

  addCard() {
    // addCard
  }

  isBust() {
    // isBust
  }

  score() {
    // score
  }

  resetForNewRound() {
    this.cards = [];
  }
}


class Dealer extends Participant {
  static MIN_POINTS = 
  constructor() {
    super('Dealer', null);
  }

  hits() {
    // TODO
  }
}

class Player extends Participant {
  constructor(name, money) {
    super('Player', money);
    this.money = money;
  }

  hits() {
    // TODO
  }
}


class Game {
  constructor() {
    this.deck = new Deck();
    this.dealer = new Dealer('Dealer');
    // When the program starts, give the player 5 dollars with which to bet.Deduct 1 dollar each time she loses, and add 1 dollar each time she wins.The program should quit when she is broke(0 dollars) or rich(has a total of 10 dollars).
    this.player = new Player('Human', PLAYER_STARTING_MONEY);
  }

  play() {
    // Welcome the player to the game
    console.log('Welcome to Twenty-One!');

    this.playOneRound();
    this.player.adjustMoney()
    if (this.playerWon()) {
    }
    // After each game is over, ask the player if they want to play again.Start a new game if they say yes, else end the game.

    // Be prepared to run out of cards.You can either create a new deck for each game, or keep track of how many cards remain and create a new deck as needed.

    // say good bye when they quit.
  }

  playOneRound() {
    // Each time the player has an opportunity to hit or stay:
    // Display the computer's hand; one card should remain hidden.
    // Display the player's hand and her point total.
    // For the dealer's turn:

    // The dealer doesn't play at all if the player busts.
    // Display the dealer's hand, including the hidden card, and report his point total.
    // Redisplay the dealer's hand and point total and each time he hits.

    // Display the results when the dealer stays.
  }
}