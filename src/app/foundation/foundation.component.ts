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

  constructor(private deckService: DeckService, private gameControl: GameControlService) {
  }

  ngOnInit() {
  }

  onDragStart(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.gameControl.onDragStart(event);
  }

  onDragMove(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.gameControl.onDragMove(event);
  }

  onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.gameControl.onDragEnd(event);
  }

  move(deck: Deck) {
    for (let i = 0; i < this.maneuvers.length; i++) {
      this.remove(this.currentCard, this.maneuvers[i]);
    }
    this.gameControl.move(this.currentCard, deck);
  }
  remove(card: Card, deck: Deck) {
    this.gameControl.remove(card, deck);
  }
}
