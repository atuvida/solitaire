import { DroppableService } from './droppable.service';
import { AppDraggableRx } from './app-draggablerx.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDraggableDirective } from './app-draggable.directive';
import { MovableDirective } from './movable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { DroppableDirective } from './droppable.directive';
import { MovableSetDirective } from './movable-set.directive';

@NgModule({
  exports: [
    AppDraggableDirective,
    AppDraggableRx,
    MovableDirective,
    DropzoneDirective,
    DroppableDirective,
    MovableSetDirective
  ],
  imports: [
    CommonModule
  ],
  declarations: [
    AppDraggableDirective, 
    AppDraggableRx,
    MovableDirective,
    DropzoneDirective,
    DroppableDirective,
    MovableSetDirective
  ],
  providers: [
    DroppableService
  ]
})
export class DraggableModule {

 }
