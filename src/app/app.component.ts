import { GameControlService } from './game-control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solitaire';

  constructor(private gameControl: GameControlService){
  }

  ngOnInit(){
    this.gameControl.initializeGame();
  }

  // addCard(){
  //   let card = this.deckService.getDeckTop();
  //   let talon = document.getElementById("talon_0");
  //   talon.appendChild(card);
  // }
}
