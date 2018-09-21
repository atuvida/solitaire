import { UtilityService } from './../utility.service';
import { DeckTypes } from './../enums/enums';
import { Card } from './../card';
import { DroppableService } from './../draggable/droppable.service';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { foundationAnim } from '../animations';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss'],
  animations: [foundationAnim]
})
export class FoundationComponent implements OnInit {

  foundations = this.deckService.foundations;
  waste = this.deckService.waste;

  sourceDeck?: Deck;
  draggedCard?: Card;
  draggedSet?: Card[];
  deck?: Deck;

  constructor(private deckService: DeckService,
    private droppableService: DroppableService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
  }

  drop() {
    this.deck = this.droppableService.droppableZone;
    this.sourceDeck = this.droppableService.sourceDeck;
    this.draggedCard = this.droppableService.droppableCard;
    
    if(this.isCardValid(this.draggedCard)){
      
      if(this.sourceDeck.type == DeckTypes.Waste){
        this.waste.getTopCard();
      }else{
        this.sourceDeck.getTopCard();
      }
      this.deck.addCard(this.draggedCard);

      if(!this.sourceDeck.isEmpty() 
      && !this.sourceDeck.top.flipped
      && this.sourceDeck.type !== DeckTypes.Waste){
        this.sourceDeck.flipTop();
      }
      this.utilityService.createLog(this.sourceDeck, this.deck, this.draggedCard);
    }
  }

  isCardValid(draggedCard: Card): boolean{
    this.draggedSet = this.droppableService.droppableCardSet;

    if(this.draggedSet.length > 0){
      return false;
    }
    return this.deck.isCardPlayable(draggedCard);
  }

  autoPlayCard(card: Card, deck: Deck){
    if(deck.isEmpty()){
      return;
    }
    this.deckService.autoPlayCard(card, deck);
  }
}
