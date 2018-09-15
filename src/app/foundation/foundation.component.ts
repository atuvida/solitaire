import { DeckService } from './../deck.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit {

  foundations = this.deckService.foundations;

  constructor(private deckService: DeckService){
  }

  ngOnInit() {
  }

}
