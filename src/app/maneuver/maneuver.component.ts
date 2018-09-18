import { DeckService } from './../deck.service';
import { DroppableService } from './../draggable/droppable.service';
import { Card } from './../card';
import { Deck } from '../deck';
import { Component, OnInit } from '@angular/core';
import { RANK } from '../enums/ranks';
@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.scss']
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

    if(this.isCardValid(this.draggedCard)){
      if(this.sourceDeck !== undefined){
        this.sourceDeck.topCard;
      }else{
        this.waste.topCard;
        console.log('waste size '+this.waste.size);
      } 
      this.deck.addCard(this.draggedCard);

      this.draggedSet = this.droppableService.droppableCardSet;
      
      if(this.draggedSet !== undefined){
        this.deck.addSet(this.draggedSet);
      }

      if( this.sourceDeck == undefined){
        return;
      }

      if(!this.sourceDeck.isEmpty() && !this.sourceDeck.top.flipped){
        this.sourceDeck.flipTop();
      }

    }
  }

  isCardValid(card: Card): boolean{

    if(this.deck.isEmpty() && this.draggedCard.Rank == RANK.King){
      return true;
    }

    if(!this.deck.isEmpty() && this.draggedCard.Color !== this.deck.top.Color && this.draggedCard.Rank == this.deck.top.Rank-1){
      return true;
    }
    
    return false;
  }

}
