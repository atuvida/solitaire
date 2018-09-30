import { UtilityService } from './../utility.service';
import { DeckTypes } from './../enums/enums';
import { maneuverAnimation } from './../animations';
import { DeckService } from './../deck.service';
import { DroppableService } from './../draggable/droppable.service';
import { Card } from './../card';
import { Deck } from '../deck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss'],
  animations: [maneuverAnimation]
})
export class ManeuverComponent implements OnInit {
  maneuvers = this.deckService.maneuvers;
  waste = this.deckService.waste;

  draggedCard?: Card;
  sourceDeck?: Deck;
  draggedSet?: Card[];
  deck?: Deck;

  constructor(private deckService: DeckService,
    private droppableService: DroppableService,
    private utilityService: UtilityService) {
  }

  ngOnInit() { }

  drop() {
    this.deck = this.droppableService.droppableZone;
    this.draggedCard = this.droppableService.droppableCard;
    this.sourceDeck = this.droppableService.sourceDeck;

    if (this.deck.canAccept(this.draggedCard)) {

      if (this.sourceDeck.type == DeckTypes.Waste) {
        this.waste.removeTop();
      } else {
        this.sourceDeck.removeTop();
      }
      this.deck.addCard(this.draggedCard);

      this.draggedSet = this.droppableService.droppableCardSet;

      if (this.draggedSet.length > 0) {
        this.deck.addSet(this.draggedSet);
      }

      if (!this.sourceDeck.isEmpty()
        && !this.sourceDeck.topCard.flipped
        && this.sourceDeck.type !== DeckTypes.Waste) {
        this.sourceDeck.flipTop();
      }
      
      if(this.deckService.allCardsFlipped()){
        this.deckService.clearManeuvers();
        this.utilityService.gameWon();
        return;
      }
      this.deckService.suggestNextMove();
      this.utilityService.createLog(this.sourceDeck, this.deck, this.draggedCard, this.draggedSet);
    }
  }

  autoPlayCard(card: Card, deck: Deck) {
    if (deck.isEmpty()) {
      return;
    }
    this.deckService.autoPlayCard(card, deck);
  }
  
  maneuversCleared(): boolean {
    return this.deckService.maneuversCleared();
  }

}
