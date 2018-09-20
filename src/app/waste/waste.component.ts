import { Card } from './../card';
import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';
import { wasteAnimation } from '../animations';
import { Deck } from '../deck';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss'],
  animations: [ wasteAnimation ]
})
export class WasteComponent implements OnInit {
  waste = this.deckService.waste;
  talon = this.deckService.talon;
  loaded: boolean = (this.deckService.waste.size > 3);

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
