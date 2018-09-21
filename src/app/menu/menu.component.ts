import { GameControlService } from './../game-control.service';
import { flipAnimation4 } from './../animations';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ flipAnimation4 ]
})
export class MenuComponent implements OnInit {
  menuItems: string[] = [];
  menu: string[] = ['New', 'Restart', 'Hints', 'Logs'];
  toggleActivationCnt: number = 0;

  constructor(private gameControl: GameControlService, private utilityService: UtilityService) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.toggleActivationCnt++;
    console.log('toggles '+this.toggleActivationCnt+' menu length '+this.menu.length);
    if(this.toggleActivationCnt > 1){
      console.log('multiple toggles');
      this.menu.length = 0;
    }
    if(this.menu.length == 0){
      this.loadMenu();
      this.toggleActivationCnt = 0;
      return;
    }
    if(this.menu.length == 4){
      this.clearMenu();
      this.toggleActivationCnt = 0;
      return;
    }
  }

  clearMenu(){
    if(this.menu.length>0){
      setTimeout(() => {
        this.menuItems.push(this.menu.pop());
        this.clearMenu();
      }, 50);
    }
  }

  loadMenu(){
    if(this.menu.length < 4){
      setTimeout(() => {
        this.menu.push(this.menuItems[this.menu.length]);
        this.loadMenu();
      }, 50);
    }
  }

  selected(menuOption: string){
    if(menuOption == 'Restart'){
      this.restart();
    }
    if(menuOption == 'New'){
      this.newGame();
    }
    if(menuOption == 'Hints'){
      this.newGame();
    }
    if(menuOption == 'Logs'){
      this.newGame();
    }
  }

  restart(): void{
    this.gameControl.restartGame();
  }

  newGame(): void{
    this.gameControl.newGame();
  }
  

}