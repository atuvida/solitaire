import { Deck } from './deck';
import { GameControlService } from './game-control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solitaire';
  foundations: Deck[] = this.gameControl.foundations;
  maneuvers: Deck[] = this.gameControl.maneuvers;

  constructor(private gameControl: GameControlService){
  }

  ngOnInit(){
    this.gameControl.createDecks();
  }

  ngAfterViewInit(){
    this.gameControl.initializeGame();
  }

}
