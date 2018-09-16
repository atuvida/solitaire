import { Directive, HostListener, HostBinding } from '@angular/core';
import { AppDraggableDirective } from './app-draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[movable]'
})
export class MovableDirective extends AppDraggableDirective{

  @HostBinding('style.transform') get transform(): SafeStyle{
    return this.sanitizer.bypassSecurityTrustStyle(
     `translateX(${this.position.x}px) translateY(${this.position.y}px)`
        );
  }

  @HostBinding('class.movable') movable = true;

  constructor(private sanitizer: DomSanitizer){
    super();
  }

  private position: Position = {x: 0, y: 0};
  private startPosition: Position = {x: 0, y: 0};
  private reset: boolean = true;

  @HostListener('dragStart', ['$event']) 
  onDragStart(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }

  @HostListener('dragMove', ['$event']) 
  onDragMove(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.position.x = event.clientX - this.startPosition.x,
    this.position.y = event.clientY - this.startPosition.y
  }

  @HostListener('dragEnd', ['$event']) 
  onDragEnd(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    if(this.reset){
      this.position = {x: 0, y: 0};
    }
  }

}
