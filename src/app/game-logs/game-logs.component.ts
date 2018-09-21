import { GameLog } from './../utility.service';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-game-logs',
  templateUrl: './game-logs.component.html',
  styleUrls: ['./game-logs.component.scss']
})
export class GameLogsComponent implements OnInit {

  gameLogs: GameLog[] = [];

  constructor(private utilityService: UtilityService) {
    this.gameLogs = this.utilityService.gameLogs;
  }

  ngOnInit() {
  }

}
