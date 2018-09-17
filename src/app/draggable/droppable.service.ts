import { Position } from './movable.directive';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DroppableService {

  startPosition: Position;

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
}
