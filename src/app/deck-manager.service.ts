import { Card } from './card';
import { Injectable, OnInit } from '@angular/core';

const maxRank = 13;
const maxSuit = 4;

@Injectable({
  providedIn: 'root'
})

export class DeckManagerService {
  
  constructor() { }

  deck: Card[] = [];

  generateDeck(){
    for(let rank = 0; rank < maxRank; rank++){
      for(let suit = 0; suit < maxSuit; suit++){
        let card = new Card(suit,rank);
        this.deck.push(card);
        console.log(card);
      }
    }
  }

  getDeckTop(){
    let card = this.deck.pop();
    return card.body;
  }
}
