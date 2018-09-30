import { Deck } from './../deck';
import { Card } from './../card';
import { DomSanitizer } from '@angular/platform-browser';
import { DroppableService } from './droppable.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective{

  sanitizer: DomSanitizer;
  droppableSet: Card[] = [];

  @Input('droppableCard') droppableCard: Card;
  @Input('sourceDeck') sourceDeck: Deck;

  constructor(private droppableService: DroppableService) {
   }

   @HostListener('dragStart', ['$event'])
   onDragStart(event: PointerEvent): void {
     event.preventDefault();
     event.stopPropagation();
     this.droppableService.onDragStart(event);
     this.droppableService.setDroppableCard(this.droppableCard);
     this.droppableService.setDroppableCardSource(this.sourceDeck);

     if(this.droppableCard !== this.sourceDeck.topCard){
      this.droppableSet = this.sourceDeck.createSetFromIndex(this.sourceDeck.cardIndex(this.droppableCard));
      this.droppableService.createDroppableSet(this.droppableSet);
     }

   }
   
  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragEnd(event);

    if(this.droppableSet.length > 0 && this.droppableCard == this.sourceDeck.topCard){
      this.sourceDeck.addSet(this.droppableSet);
    }
  }
}
