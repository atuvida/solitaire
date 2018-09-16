import { GameControlService } from './game-control.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private gameControl: GameControlService){
  }

  ngOnInit(){
    this.gameControl.initializeGame();
  }

  ngAfterViewInit(){
  }
}
