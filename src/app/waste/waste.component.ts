import { DeckService } from './../deck.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.scss']
})
export class WasteComponent implements OnInit {
  waste = this.deckService.waste;
  talon = this.deckService.talon;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
  }

}
