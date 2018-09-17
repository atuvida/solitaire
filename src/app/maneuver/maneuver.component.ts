import { Card } from './../card';
import { Deck } from '../deck';
import { GameControlService } from './../game-control.service';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
import { RANK } from '../enums/ranks';
@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss']
})
export class ManeuverComponent implements OnInit {

  maneuvers = this.deckService.maneuvers;
  currentCard?: Card ;
  sourceDeck?: Deck;
  movableSet: Card[] = [];

  constructor(private deckService: DeckService, private gameControl: GameControlService) {
  }

  ngOnInit() {

  }

  addCurrentCard(deck: Deck) {
    let card = this.currentCard;

    if(card == deck.top){
      return;
    }

    if(deck.isEmpty() && card.Rank == RANK.King){
      this.sourceDeck.topCard;
      deck.addCard(card);
      if(!deck.isEmpty()){
        deck.flipTop();
      }
    }

    let topCard = deck.top;
    if(card.Color !== topCard.Color && card.Rank == topCard.Rank-1){
      this.sourceDeck.topCard;
      deck.addCard(card);

      if(this.movableSet.length > 0){
        deck.addSet(this.movableSet);
      }
    }    

    if(!this.sourceDeck.isEmpty()){
      this.sourceDeck.flipTop();
    }

  }
    
  moveCardSet(): void{
    let deck = this.sourceDeck;
    
    if(deck.top == this.currentCard){
      return;
    }
    this.movableSet = deck.removeSetFrom(deck.cards.indexOf(this.currentCard));
    console.log('set first card '+ this.movableSet[0].id);
  }

  returnSet(): void{
    if(this.sourceDeck.cards.indexOf(this.currentCard) !== -1){
      this.sourceDeck.addSet(this.movableSet);
    }
  }
}
