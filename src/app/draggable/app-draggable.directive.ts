import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAppDraggable]'
})
export class AppDraggableDirective {
  @HostBinding('class.draggable') draggable = true;

  constructor() { }

}
