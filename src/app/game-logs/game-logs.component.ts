import { DeckService } from './../deck.service';
import { Subscription } from 'rxjs';
import { GameLog } from './../utility.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-game-logs',
  templateUrl: './game-logs.component.html',
  styleUrls: ['./game-logs.component.scss']
})
export class GameLogsComponent implements OnInit, OnDestroy{
  activeLogs: boolean;
  activeHints: boolean;
  logSubscription: Subscription;
  hintSubscription: Subscription;

  gameLogs: GameLog[];
  gameHints: string[];

  constructor(private utilityService: UtilityService, private deckService: DeckService) {
    this.gameLogs = this.utilityService.gameLogs;
    this.gameHints = this.utilityService.gameHints;
    this.logSubscription = this.utilityService.getLogStatus().subscribe(NEXT => {this.activeLogs = NEXT});
    this.hintSubscription = this.utilityService.getHintStatus().subscribe(NEXT => {this.activeHints = NEXT});
  }

  ngOnInit() {
  }

  ngOnDestroy(): void{
    this.logSubscription.unsubscribe();
    this.hintSubscription.unsubscribe();
  }
}
