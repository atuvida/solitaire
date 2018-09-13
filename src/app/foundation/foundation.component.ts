import { Deck } from './../deck';
import { GameControlService } from './../game-control.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit {

  foundations: Deck[] = this.gameControl.foundations;

  constructor(private gameControl: GameControlService){
  }

  ngOnInit() {
  }

}
