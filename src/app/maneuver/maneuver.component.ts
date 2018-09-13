import { Deck } from './../deck';
import { GameControlService } from './../game-control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.css']
})
export class ManeuverComponent implements OnInit {

  maneuvers: Deck[] = this.gameControl.maneuvers;

  constructor(private gameControl: GameControlService){
  }

  ngOnInit() {
    
  }

}
