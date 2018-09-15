import { DeckService } from './../deck.service';
import { Deck } from './../deck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talon',
  templateUrl: './talon.component.html',
  styleUrls: ['./talon.component.css']
})
export class TalonComponent implements OnInit {

  Deck: Deck = this.deckService.talon;
  constructor(private deckService: DeckService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }
}