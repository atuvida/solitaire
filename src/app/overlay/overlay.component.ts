import { GameControlService } from './../game-control.service';
import { UtilityService } from './../utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  textDisplay: string[];
  options: string[] = ['START'];

  constructor(private utilityService: UtilityService, private gameControl: GameControlService) {
    this.textDisplay =  this.utilityService.overlayText;
  }

  ngOnInit() {
  }

  selectionMade(option: string){
    if(option == 'RESTART'){
      this.restart();
    }
    if(option == 'NEW GAME'){
      this.newGame();
    }
    if(option == 'START'){
      this.options = ['RESTART', 'NEW GAME']
      this.startGame();
    }
  }
  restart(): void{
    this.utilityService.setStatus(false);
    this.gameControl.restartGame();
  }

  newGame(): void{
    this.utilityService.setStatus(false);
    this.gameControl.newGame();
  }
  startGame(): void{
    this.utilityService.setStatus(false);
  }
  
}
