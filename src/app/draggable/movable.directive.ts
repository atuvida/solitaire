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
     `translateX(${this.position.x}px) translateY(${this.position.y}px)`);
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
    this.position = {
      x: event.clientX - this.startPosition.x,
      y: event.clientY - this.startPosition.y
    }
    if(this.movableType == "menu"){
      if(event.clientX < 85 || event.clientY < 100 
        || !(this.position.x < 0 && this.position.y < 0)){
        this.reset = true;
      }else{
        this.reset = false;
      }
    }
    
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
