import { Card } from './../card';
import { GameControlService } from './../game-control.service';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss']
})
export class FoundationComponent implements OnInit {

  foundations = this.deckService.foundations;
  maneuvers = this.deckService.maneuvers;

  currentCard?: Card;
  sourceDeck?: Deck;

  constructor(private deckService: DeckService, private gameControl: GameControlService) {
  }

  ngOnInit() {
  }

  addCurrentCard(deck: Deck) {
    let card = this.currentCard;
    console.log('attempting to add card'+card.id);
    if(card == deck.top){
      return;
    }
    for (let i = 0; i < this.foundations.length; i++) {
      this.sourceDeck.topCard;
    }
    deck.addCard(card);
  }

}
