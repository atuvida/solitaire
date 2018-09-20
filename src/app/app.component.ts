import { UtilityService } from './utility.service';
import { GameControlService } from './game-control.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  activeOverlay: boolean = true;
  subscription: Subscription;

  constructor(private utilityService: UtilityService, private gameControl: GameControlService){
    this.subscription = this.utilityService.getStatus().subscribe((status) => {this.activeOverlay = status});
  }

  ngOnInit(){
    this.gameControl.initializeGame();
  }
    
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
