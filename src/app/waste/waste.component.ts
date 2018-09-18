import { Card } from './../card';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
import { flipAnimation } from '../animations';
import { Deck } from '../deck';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  animations: [ flipAnimation ]
})
export class WasteComponent implements OnInit {
  waste = this.deckService.waste;
  talon = this.deckService.talon;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
  }

  autoPlayCard(card: Card, deck: Deck){
    if(deck.isEmpty()){
      return;
    }
    this.deckService.autoPlayCard(card, deck);
  }

}
