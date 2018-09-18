import { Position } from './movable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DroppableService } from './droppable.service';
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[movableSet]'
})
export class MovableSetDirective {
  
  @HostBinding('style.transform') get transform(): SafeStyle{
    return this.sanitizer.bypassSecurityTrustStyle(
     `translateX(${this.position.x}px) translateY(${this.position.y}px)`
        );
  }
  @HostBinding('attr.id.movableSet') activated = false;

  private position: Position = {x: 0, y: 0};

  constructor(private sanitizer: DomSanitizer, private droppableService: DroppableService){
  }

  ngOnInit(): void {
    this.droppableService.dragMove$.subscribe(event => this.onDragMove(event));
  }
  private onDragMove(event: PointerEvent){
    event.preventDefault();
    event.stopPropagation();
    // this.position = this.droppableService.position;
    this.position.y = this.position.y + 20;
    this.activated = true;
  }
}
