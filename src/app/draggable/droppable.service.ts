import { Card } from './../card';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Deck } from '../deck';

@Injectable({
  providedIn: 'root'
})

export class DroppableService {

  droppableCard: Card;
  sourceDeck: Deck;
  droppableCardSet: Card[] = [];
  droppableZone: Deck;

  dragStart$:Observable<PointerEvent>;
  dragEnd$:Observable<PointerEvent>;
  dragMove$:Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor() {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    this.dragStartSubject.next(event);
  }

  onDragMove(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    this.dragMoveSubject.next(event);
  }

  onDragEnd(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    this.dragEndSubject.next(event);
  }

  setDroppableCard(card: Card){
    this.droppableCard = card;
  }

  setDropZone(deck: Deck){
    this.droppableZone = deck;
  }
  
  setDroppableCardSource(deck: Deck){
    this.sourceDeck = deck;
  }

  createDroppableSet(cardSet: Card[]){
    this.droppableCardSet = cardSet;
  }
}
