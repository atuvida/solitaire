import { UtilityService } from './utility.service';
import { GameControlService } from './game-control.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NEXT } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  activeOverlay: boolean = true;
  subscription: Subscription;

  constructor(private utilityService: UtilityService, private gameControl: GameControlService){
    this.subscription = this.utilityService.getStatus().subscribe(NEXT => {this.activeOverlay = NEXT});
  }

  ngOnInit(){
    this.gameControl.initializeGame();
  }
    
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
