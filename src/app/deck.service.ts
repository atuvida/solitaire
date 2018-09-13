import { Deck } from './deck';
import { Card } from './card';
import { Injectable } from '@angular/core';

const maxRank = 13;
const maxSuit = 4;

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor() { }

  mainDeck: Deck = new Deck('mainDeck');

  deckCreated: boolean = false;

  generateDeck(){
    for(let rank = 0; rank < maxRank; rank++){
      for(let suit = 0; suit < maxSuit; suit++){
        let card = new Card(suit,rank);
        this.mainDeck.addCard(card);
        console.log(card);
      }
    }
    this.deckCreated
 = true;
  }
}
