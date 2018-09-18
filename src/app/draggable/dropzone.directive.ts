import { DroppableService } from './droppable.service';
import { Directive, OnInit, HostBinding, HostListener, Input, SkipSelf, Output, EventEmitter } from '@angular/core';
import { Deck } from '../deck';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective implements OnInit{

  @Input('thisDeck') deck: Deck;
  
  @Output() drop = new EventEmitter<PointerEvent>();

  @HostBinding('class.activated-dropzone') activated = false;
  @HostBinding('class.entered-dropzone') entered = false;

  @HostListener('pointerenter') onPointerEnter(): void {
    if (!this.activated) {
      return;
    }
    this.entered = true;
    this.droppableService.setDropZone(this.deck);
  }

  @HostListener('pointerleave') onPointerLeave(): void {
    if (!this.activated) {
      return;
    }
    this.entered = false;
  }

  constructor(private droppableService: DroppableService) { }

  ngOnInit(): void {
    this.droppableService.dragStart$.subscribe(() => this.onDragStart());
    this.droppableService.dragEnd$.subscribe(event => this.onDragEnd(event));
  }

  private onDragStart(): void {
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if(this.entered){
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

}
