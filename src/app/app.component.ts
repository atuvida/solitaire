import { DeckManagerService } from './deck-manager.service';
import { Card } from './card';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solitaire';

  constructor(private dm: DeckManagerService){
  }

  genDeck(){
    if(this.dm.deck === undefined || this.dm.deck.length == 0){
      this.dm.generateDeck();
    }else{
      console.log("deck already created");
    }
  }
  addCard(){
    let card = this.dm.getDeckTop();
    let talon = document.getElementById("talon_0");
    talon.appendChild(card);
  }
}
