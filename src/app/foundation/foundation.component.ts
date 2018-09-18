import { Card } from './../card';
import { RANK } from './../enums/ranks';
import { DroppableService } from './../draggable/droppable.service';
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

  sourceDeck?: Deck;
  draggedCard?: Card;
  draggedSet?: Card[];
  deck?: Deck;

  constructor(private deckService: DeckService,
    private droppableService: DroppableService) {
  }

  ngOnInit() {
  }

  drop(deck: Deck) {
    this.deck = this.droppableService.droppableZone;
    this.sourceDeck = this.droppableService.sourceDeck;
    this.draggedCard = this.droppableService.droppableCard;
    
    if(this.isCardValid(this.draggedCard)){
      this.sourceDeck.topCard;
      this.deck.addCard(this.draggedCard);
      
      if(this.draggedSet !== undefined){
        this.deck.addSet(this.draggedSet);
      }

      if(!this.sourceDeck.isEmpty()){
        this.sourceDeck.flipTop();
      }

    }
  }

  isCardValid(draggedCard: Card): boolean{
    this.draggedSet = this.droppableService.droppableCardSet;

    if(this.draggedSet.length > 0){
      console.log('dragging a set'+this.draggedSet.length);
      return false;
    }

    if(this.deck.isEmpty() && draggedCard.Rank == RANK.Ace){
      console.log('accepts ace');
      return true;
    }

    if(!this.deck.isEmpty() && draggedCard.Suit == this.deck.top.Suit && draggedCard.Rank == this.deck.top.Rank+1){
      console.log('valid addition');
      return true;
    }
    
    return false;
  }

}
