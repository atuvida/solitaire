import { Card } from './card';
import { Deck } from './deck';
import { DeckService } from './deck.service';
import { Injectable } from '@angular/core';

const maneuverCount = 7, foundationCount = 4;

@Injectable({
  providedIn: 'root'
})
export class GameControlService {

  maneuvers: Deck[] = [];
  foundations: Deck[] = [];
  talon: Deck = new Deck('talon_0');
  waste: Deck = new Deck('waste_0');
  mainDeck: Deck = this.deckService.mainDeck;

  constructor(private deckService: DeckService) { }

  initializeGame(){
    if(this.deckService.deckCreated == false){
      this.deckService.generateDeck();
      // this.shuffleCards();
      this.distributeCards();
    }
  }

  createDecks(){
    for (let i = 0; i < maneuverCount; i++) {
      let maneuver = new Deck('maneuver_'+i);
      this.maneuvers.push(maneuver);
    }

    for (let i = 0; i < foundationCount; i++) {
      let foundation = new Deck('foundation_'+i);
      this.foundations.push(foundation);
    }
    console.log('decks created');
  }

  distributeCards(){

	// let columnCount = 7;
	// let rowCount = 7;

	for (let i = 0; i < this.maneuvers.length; i++) {
		for (let j = i; j < this.maneuvers.length; j++) {
			let topCard = this.mainDeck.getTopCard();
      let maneuver = this.maneuvers[j];
      topCard.style.top = i*15+"%";
      topCard.style.left = i+"%";
			maneuver.addCardToDeck(topCard);
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
