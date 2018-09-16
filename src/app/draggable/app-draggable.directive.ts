import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class AppDraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();
  
  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent): void{
    event.stopPropagation();
    event.preventDefault();
    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document: pointermove', ['$event']) onPointerMove(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    if(!this.dragging){
      return;
    }
    this.dragMove.emit(event);
  }
 
  @HostListener('document: pointerup', ['$event']) onPointerUp(event: PointerEvent): void{
    event.preventDefault();
    event.stopPropagation();
    if(!this.dragging){
      return;
    }
    this.dragEnd.emit(event);
    this.dragging = false;
  }

  constructor() { }

}
