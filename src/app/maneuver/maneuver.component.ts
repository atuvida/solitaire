import { Card } from './../card';
import { Deck } from '../deck';
import { GameControlService } from './../game-control.service';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss']
})
export class ManeuverComponent implements OnInit {

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

  move(card: Card, deck: Deck) {
    for (let i = 0; i < this.maneuvers.length; i++) {
      this.remove(card, this.maneuvers[i]);
    }
    this.gameControl.move(card, deck);
  }
  remove(card: Card, deck: Deck) {
    this.gameControl.remove(card, deck);
  }
}
