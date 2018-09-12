import { Card } from './card';
import { Deck } from './deck';
import { DeckService } from './deck.service';
import { Injectable } from '@angular/core';

const maneuverCount = 7, foundationCount = 4;

@Injectable({
  providedIn: 'root'
})
export class GameControlService {

  maneuver: Deck[] = [];
  foundation: Deck[] = [];
  talon: Deck = new Deck('talon_0');
  waste: Deck = new Deck('waste_0');
  mainDeck: Deck = this.deckService.mainDeck;

  constructor(private deckService: DeckService) { }

  initializeGame(){
    if(this.deckService.deckIsPlayed == false){
      this.deckService.generateDeck();
      // this.shuffleCards();
      this.createDecks();
      this.distributeCards();
    }
  }

  createDecks(){
    
    for (let i = 0; i < maneuverCount; i++) {
      let id = 'maneuver_'+i;
      let maneuverPile = new Deck(id);
      this.maneuver.push(maneuverPile);
    }

    for (let i = 0; i < foundationCount; i++) {
      let id = 'foundation_'+i;
      let foundationPile = new Deck(id);
      this.foundation.push(foundationPile);
    }

    console.log('decks created');
  }

  distributeCards(){

	let columnCount = 7;
	let rowCount = 7;

	for (let i = 0; i < columnCount; i++) {
		for (let j = i; j < rowCount; j++) {
			let topCard = this.mainDeck.getTopCard();
      let thisManeuver = this.maneuver[j];
      topCard.style.top = i*15+"%";
      topCard.style.left = i+"%";
			thisManeuver.addCardToDeck( topCard);
		}
		// let maneuverTop = lastCard(maneuvers[i]);
		// autoFlip(maneuverTop);
	}

	while(!this.mainDeck.isEmpty()){
		let topCard = this.mainDeck.getTopCard();
		this.talon.addCardToDeck(topCard);
  }
  
  }
}
