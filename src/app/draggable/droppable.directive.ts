import { DroppableService } from './droppable.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective {

  constructor(private droppableService: DroppableService) { }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragStart(event);
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.droppableService.onDragEnd(event);
  }
}
