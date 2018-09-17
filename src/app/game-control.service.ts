import { DeckService } from './deck.service';
import { Injectable } from '@angular/core';
import { Card } from './card';
import { Deck } from './deck';


@Injectable({
  providedIn: 'root'
})
export class GameControlService {

  constructor(private deckService: DeckService) { }

  initializeGame(){
      this.deckService.generateMainDeck();
      this.deckService.shuffleDeckCards();
      this.deckService.createGameDecks();
      this.deckService.distributeCards();
  }


  move(card: Card, deck: Deck){
    deck.addCard(card);
  }
  
  remove(card: Card, deck: Deck){
    if(deck.cards.indexOf(card) !== -1){
      deck.cards.splice(deck.cards.indexOf(card), 1);
    }
  }

}
