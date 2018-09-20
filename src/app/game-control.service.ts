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
      this.deckService.mainDeckCopy.clear();
      this.deckService.copyDeck(this.deckService.mainDeckCopy,this.deckService.mainDeck);
      this.deckService.createGameDecks();
      this.deckService.distributeCards();
  }

  restartGame(){
    this.deckService.clearDecks();
    this.deckService.copyDeck(this.deckService.mainDeck,this.deckService.mainDeckCopy);
    setTimeout(() => {
      this.deckService.distributeCards();
    }, 400);
  }

  newGame(){
    this.deckService.clearDecks();     
    this.deckService.generateMainDeck();
    this.deckService.mainDeckCopy.clear();
    // this.deckService.shuffleDeckCards();
    this.deckService.copyDeck(this.deckService.mainDeckCopy,this.deckService.mainDeck);
    setTimeout(() => {
      this.deckService.distributeCards();
    }, 400);
  }

}
