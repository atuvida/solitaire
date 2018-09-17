import { Position } from './movable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DroppableService } from './droppable.service';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { NEXT } from '@angular/core/src/render3/interfaces/view';

@Directive({
  selector: '[movableSet]'
})
export class MovableSetDirective {
  
  @HostBinding('style.transform') get transform(): SafeStyle{
    return this.sanitizer.bypassSecurityTrustStyle(
     `translateX(${this.position.x}px) translateY(${this.position.y}px)`
        );
  }
  @HostBinding('class.movableSet') activated = false;

  private position: Position = {x: 0, y: 0};
  private startPosition: Position = {x: 0, y: 0};
  private reset: boolean = true;

  constructor(private sanitizer: DomSanitizer, private droppableService: DroppableService){
  }

  ngOnInit(): void {
    this.droppableService.dragStart$.subscribe( event => this.onDragStart(event) );
    this.droppableService.dragEnd$.subscribe(event => this.onDragEnd(event));
    this.droppableService.dragMove$.subscribe(event => this.onDragMove(event));
  }

  private onDragStart(event: PointerEvent): void {
    console.log('movable drag started');
    event.preventDefault();
    event.stopPropagation();
    this.startPosition = this.droppableService.startPosition;
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if(this.reset){
      this.position = {x: 0, y: 0};
    }
    
    this.activated = false;
  }

  private onDragMove(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    this.position.x = event.clientX,
    this.position.y = event.clientY + 20
  }
}
