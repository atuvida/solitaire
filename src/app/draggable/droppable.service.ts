import { Deck } from './../deck';
import { Card } from './../card';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DroppableService {

  dragStart$:Observable<PointerEvent>;
  dragEnd$:Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor() {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
    console.log('created a dropzone');
  }

  onDragStart(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    this.dragStartSubject.next(event);
  }

  onDragEnd(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    this.dragEndSubject.next(event);
  }
}
