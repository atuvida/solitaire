import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDraggableDirective } from './app-draggable.directive';

@NgModule({
  exports: [
    AppDraggableDirective
  ],
  imports: [
    CommonModule
  ],
  declarations: [AppDraggableDirective]
})
export class DraggableModule {

 }
