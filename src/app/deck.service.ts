import { Deck } from './deck';
import { Card } from './card';
import { Injectable } from '@angular/core';
import { DeckTypes } from './enums/deckTypes';

const maxRank = 13, maxSuit = 4;
const maneuverCount = 7, foundationCount = 4;

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor() { }

  mainDeck: Deck; 
  talon: Deck = new Deck('talon_0',DeckTypes.Talon);
  waste: Deck = new Deck('waste_0',DeckTypes.Waste);
  maneuvers: Deck[] = [];
  foundations: Deck[] = [];

  deckCreated: boolean = false;

  generateMainDeck(): void{

    this.mainDeck = new Deck('Main',DeckTypes.Main);

    for(let rank = 0; rank < maxRank; rank++){
      for(let suit = 0; suit < maxSuit; suit++){
        let card = new Card(suit,rank);
        this.mainDeck.addCard(card);
      }
    }
    this.deckCreated = true;
  }

  createGameDecks(){
    for (let i = 0; i < maneuverCount; i++) {
      let maneuver = new Deck('maneuver_'+i, DeckTypes.Maneuver);
      this.maneuvers.push(maneuver);
    }

    for (let i = 0; i < foundationCount; i++) {
      let foundation = new Deck('foundation_'+i, DeckTypes.Foundation);
      this.foundations.push(foundation);
    }
    console.log('decks created');
  }

  shuffleDeckCards(): void{
    for (let i = this.mainDeck.size - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.mainDeck.cards[i];
        this.mainDeck.cards[i] = this.mainDeck.cards[j];
        this.mainDeck.cards[j] = temp;
    }
  }
  
  distributeCards(){
    for (let i = 0; i < this.maneuvers.length; i++) {
      for (let j = i; j < this.maneuvers.length; j++) {
        let topCard = this.mainDeck.getTopCard();
        let maneuver = this.maneuvers[j];
        maneuver.addCard(topCard);
      }
      this.maneuvers[i].flipTop();
    }

    while(!this.mainDeck.isEmpty()){
      let topCard = this.mainDeck.getTopCard();
      this.talon.addCard(topCard);
    }
  }  
}
