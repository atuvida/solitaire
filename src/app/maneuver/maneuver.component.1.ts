import { flipAnimation2 } from './../animations';
import { DeckService } from './../deck.service';
import { DroppableService } from './../draggable/droppable.service';
import { Card } from './../card';
import { Deck } from '../deck';
import { Component, OnInit } from '@angular/core';
import { DeckTypes } from '../enums/deckTypes';
@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss'],
  animations: [flipAnimation2]
})
export class ManeuverComponent implements OnInit {
  maneuvers = this.deckService.maneuvers;
  waste = this.deckService.waste;

  draggedCard?: Card;
  sourceDeck?: Deck;
  draggedSet?: Card[];
  deck?: Deck;

  constructor(private deckService: DeckService ,private droppableService: DroppableService) {
  }

  ngOnInit() {  }

  drop() {
    this.deck = this.droppableService.droppableZone;
    this.draggedCard = this.droppableService.droppableCard;
    this.sourceDeck = this.droppableService.sourceDeck;

    if(this.deck.isCardPlayable(this.draggedCard)){

      if(this.sourceDeck.type == DeckTypes.Waste){
        this.waste.getTopCard();
        console.log('waste size '+this.waste.size);
      }else{
        this.sourceDeck.getTopCard();
      }
      this.deck.addCard(this.draggedCard);

      if(!this.sourceDeck.isEmpty() 
      && !this.sourceDeck.top.flipped
      && this.sourceDeck.type !== DeckTypes.Waste){
        this.sourceDeck.flipTop();
      }

    }
  }

  autoPlayCard(card: Card, deck: Deck){
    this.deckService.autoPlayCard(card, deck);
  }

}
