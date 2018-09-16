import { Card } from './../card';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<ng-template #card>
              <div class="cards" id="{{card.id}}"
              [ngStyle]="{'background-image': 'url(./assets/img/cards/back.png)'}">
              </div>
             </ng-template>
            `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
 @ViewChild("card", { read: ViewContainerRef }) cardTmplt;

  constructor(card: Card)  {
   }

  ngOnInit() {
  }

}
