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
     `translateX(${this.position.x}px) translateY(${this.position.y}px)  
     translateY(${this.yTranslate})  rotateZ(${this.zRotate})`);
  }

  @HostBinding('class.movable') movable = true;

  constructor(private sanitizer: DomSanitizer){
    super();
  }

  private position: Position = {x: 0, y: 0};
  private startPosition: Position = {x: 0, y: 0};
  private reset: boolean = true;
  private yTranslate: string = '0';
  private zRotate: string = '0';

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
      this.yTranslate = '-20%';
      setTimeout(() => {
      this.yTranslate = '0';
      }, 150);
  }

  @HostListener('dragMove', ['$event']) 
  onDragMove(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.position = {
      x: event.clientX - this.startPosition.x,
      y: event.clientY - this.startPosition.y
    }
    console.log(this.position.x+" && "+this.position.y);
    console.log(event.clientX+" && "+event.clientY);
    
    if(this.movableType == 'menu'){
      if(event.clientX < event.clientY){
        this.zRotate = "90deg";
      }else{
        this.zRotate = "0";
      }
    }
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
