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
  }

  onDragStart(event: PointerEvent): void{
    this.dragStartSubject.next(event);
  }

  onDragEnd(event: PointerEvent): void{
    this.dragEndSubject.next(event);
  }
}
