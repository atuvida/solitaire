import { flipAnimation } from './../animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ flipAnimation ]
})
export class MenuComponent implements OnInit {
  menu: string[] = [];
  menuItems: string[] = ['New', 'Restart', 'Hints', 'Logs'];
  menuItemsCnt = 0;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    if(this.menu.length == 0){
      this.loadMenu();
      return;
    }
    if(this.menu.length == 4){
      this.clearMenu();
      return;
    }
    console.log('operation cancelled');
    this.menu.length = 0;
    return;
  }

  clearMenu(){
    if(this.menu.length>0){
      setTimeout(() => {
        console.log('clearing menu');
        this.menu.pop();
        this.clearMenu();
      }, 100);
    }
  }

  loadMenu(){
    if(this.menuItemsCnt < 3){
      console.log('loading menu');
      setTimeout(() => {
        this.menu.push(this.menuItems[this.menuItemsCnt]);
        this.loadMenu();
        this.menuItemsCnt++;
      }, 100);
    }
    if(this.menuItemsCnt == 4){
      this.menuItemsCnt = 0;
    }
    while(this.menu.length > 4){
      this.menu.pop();
    }
  }

}