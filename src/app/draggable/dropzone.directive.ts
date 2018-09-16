import { Card } from './../card';
import { DroppableService } from './droppable.service';
import { QueryList, Directive, OnInit, HostBinding, HostListener, ContentChildren, AfterContentInit, ElementRef, Input, SkipSelf, Output, EventEmitter } from '@angular/core';
import { Deck } from '../deck';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective implements OnInit {

  @Input('thisDeck') thisDeck: Deck;
  @Output() drop = new EventEmitter<PointerEvent>();

  @HostBinding('class.activated-dropzone') activated = false;
  @HostBinding('class.entered-dropzone') entered = false;

  @HostListener('pointerenter') onPointerEnter(): void {
    if (!this.activated) {
      return;
    }
    this.entered = true;
  }

  @HostListener('pointerleave') onPointerLeave(): void {
    if (!this.activated) {
      return;
    }
    this.entered = false;
  }

  constructor(private droppableService: DroppableService) { }

  ngOnInit(): void {
    this.droppableService.dragStart$.subscribe(
      () => {
        this.onDragStart();
      }
    );

    this.droppableService.dragEnd$.subscribe(
      event => {
        this.onDragEnd(event);
      }
    );

    console.log(this.thisDeck.top);
  }

  private onDragStart(): void {
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    SkipSelf();
    if(this.entered){
      console.log('dropped at dropzone from'+this.thisDeck.id);
      this.drop.emit(event);
    }

    this.activated = false;
  }

}
