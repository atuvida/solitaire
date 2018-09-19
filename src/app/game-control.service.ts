import { DeckService } from './deck.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameControlService {

  constructor(private deckService: DeckService) { }

  initializeGame(){
      this.deckService.generateMainDeck();
      // this.deckService.shuffleDeckCards();
      this.deckService.createGameDecks();
      this.deckService.distributeCards();
  }

  restartGame(){
    this.deckService.clearDecks();
    this.deckService.mainDeck = Object.assign(this.deckService.mainDeckCopy);
    this.deckService.distributeCards();
  }

  newGame(){
    this.deckService.clearDecks();
    location.reload();
       
  }

}
