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

  constructor(private deckService: DeckService, private gameControl: GameControlService) {
  }

  ngOnInit() {

  }

  addCurrentCard(deck: Deck) {
    let card = this.currentCard;

    if(card == deck.top){
      return;
    }

    if(deck.isEmpty && card.Rank == RANK.King){
      for (let i = 0; i < this.maneuvers.length; i++) {
        this.remove(card, this.maneuvers[i]);
      }
      this.gameControl.move(card, deck);
      if(!deck.isEmpty()){
        deck.flipTop();
      }
    }

    let topCard = deck.top;
    if(card.Color !== topCard.Color && card.Rank == topCard.Rank-1){
      for (let i = 0; i < this.maneuvers.length; i++) {
        this.remove(card, this.maneuvers[i]);
      }
      this.gameControl.move(card, deck);

      if(!this.sourceDeck.isEmpty()){
        console.log('flipped '+this.sourceDeck.top);
        this.sourceDeck.flipTop();
      }
    }

    
  }

  remove(card: Card, deck: Deck) {
    this.gameControl.remove(card, deck);
  }
}
