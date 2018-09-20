import { talonFlipAnim } from './../animations';
import { DeckService } from './../deck.service';
import { Deck } from './../deck';
import { Component, OnInit } from '@angular/core';

enum MODE{Hard = 3, Easy = 1}

@Component({
  selector: 'app-talon',
  templateUrl: './talon.component.html',
  styleUrls: ['./talon.component.scss'],
  animations:[talonFlipAnim]
})
export class TalonComponent implements OnInit {

  talon: Deck = this.deckService.talon;
  waste: Deck = this.deckService.waste;
  maxDraw: number = MODE.Hard;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
  }

  addToWaste(): void{

    if(this.talon.isEmpty() && !this.waste.isEmpty()){
      this.recycleWaste();
      return;
    }

    if(this.talon.isEmpty() && this.waste.isEmpty()){
      return;
    }

    if(!this.waste.isEmpty()){
      //reposition waste cards
    }
  
    for(let i = 0; i < this.maxDraw; i++){
      if(!this.talon.isEmpty()){
        this.talon.top.flip();
        this.waste.addCard(this.talon.getTopCard());
      }
    }
  }


  recycleWaste(): void{
    while(!this.waste.isEmpty()){
      this.waste.top.flip();
      this.talon.addCard(this.waste.getTopCard());
    }
  }
}