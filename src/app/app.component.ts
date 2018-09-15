import { DeckService } from './deck.service';
import { Deck } from './deck';
import { GameControlService } from './game-control.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  foundations: Deck[] = this.deckService.foundations;
  maneuvers: Deck[] = this.deckService.maneuvers;
  talon: Deck = this.deckService.talon;

  constructor(private gameControl: GameControlService, private deckService: DeckService){
  }

  ngOnInit(){
    // this.gameControl.createDecks();
    this.gameControl.initializeGame();
  }

  ngAfterViewInit(){
    // this.gameControl.initializeGame();
  }

}
