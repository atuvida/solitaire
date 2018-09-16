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

  Dec
  onDragStart(event: PointerEvent): void{
    // console.log('drag started');
  }

  onDragMove(event: PointerEvent): void{
    // console.log(`drag move ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
  }

  onDragEnd(event: PointerEvent): void{
    // console.log('drag end');
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
