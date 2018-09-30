import { UtilityService } from './../utility.service';
import { Card } from './../card';
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

  constructor(private deckService: DeckService, private utilityService: UtilityService) { }

  ngOnInit() {
  }

  addToWaste(): void{
    let wasteSet: Card[] = [];

    if(this.talon.isEmpty() && !this.waste.isEmpty()){
      this.recycleWaste();
      return;
    }

    if(this.talon.isEmpty() && this.waste.isEmpty()){
      return;
    }
  
    for(let i = 0; i < this.maxDraw; i++){
      if(!this.talon.isEmpty()){
        this.talon.topCard.flip();
        wasteSet.push(this.talon.topCard);
        this.waste.addCard(this.talon.removeTop());
      }
    }
   this.deckService.suggestNextMove();
    this.utilityService.createLog(this.talon, this.waste,undefined,wasteSet); 
  }


  recycleWaste(): void{
    while(!this.waste.isEmpty()){
      this.waste.topCard.flip();
      this.talon.addCard(this.waste.removeTop());
    }
  }
}