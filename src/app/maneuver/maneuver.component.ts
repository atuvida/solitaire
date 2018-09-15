import { DeckService } from './../deck.service';  
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.css']
})
export class ManeuverComponent implements OnInit {

  maneuvers = this.deckService.maneuvers;

  constructor(private deckService: DeckService){
  }

  ngOnInit() {
    
  }

}
