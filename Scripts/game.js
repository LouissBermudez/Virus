import Deck from "./deck.js";

export default class Game{
    constructor() {
        this.deck = new Deck()
    }



    startGame(){
        this.deck.createDeck();
        this.deck.shuffle();
        this.deck.addPlayerHandDeck();
    }

    addCardToTable(){
        
    }




}


