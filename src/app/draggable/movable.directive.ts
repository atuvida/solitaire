import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { AppDraggableDirective } from './app-draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

export interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[movable]'
})
export class MovableDirective extends AppDraggableDirective{
  @Input('type') movableType: string;

  @HostBinding('style.transform') get transform(): SafeStyle{
    return this.sanitizer.bypassSecurityTrustStyle(
     `translateX(${this.position.x}px) translateY(${this.position.y}px)  translateY(${this.yTranslate})`
        );
  }

  @HostBinding('class.movable') movable = true;

  constructor(private sanitizer: DomSanitizer){
    super();
  }

  private position: Position = {x: 0, y: 0};
  private startPosition: Position = {x: 0, y: 0};
  private reset: boolean = true;
  private yTranslate: string = '0';

  @HostListener('dragStart', ['$event']) 
  onDragStart(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }
  
  @HostListener('pointerenter', ['$event']) 
  onPointerEnter(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
      this.yTranslate = '-10%';
  }
  
  @HostListener('pointerleave', ['$event']) 
  onPointerLeave(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
      this.yTranslate = '0';
  }

  @HostListener('dragMove', ['$event']) 
  onDragMove(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.position = {
      x: event.clientX - this.startPosition.x,
      y: event.clientY - this.startPosition.y
    }
    // this.droppableService.setDroppableSetPos(this.position);
  }

  @HostListener('dragEnd', ['$event']) 
  onDragEnd(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    if(this.movableType == 'menu'){
      this.reset = false;
    }
    if(this.reset){
      this.position = {x: 0, y: 0};
    }
  }

}
