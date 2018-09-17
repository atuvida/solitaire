import { DomSanitizer } from '@angular/platform-browser';
import { DroppableService } from './droppable.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[droppable], [movable]'
})
export class DroppableDirective{

  sanitizer: DomSanitizer;

  constructor(private droppableService: DroppableService) {
   }

   @HostListener('dragStart', ['$event'])
   onDragStart(event: PointerEvent): void {
     event.preventDefault();
     event.stopPropagation();
     this.droppableService.onDragStart(event);
   }
   
  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragMove(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragEnd(event);
  }
}
