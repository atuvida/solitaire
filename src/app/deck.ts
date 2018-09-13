import { style } from '@angular/animations';
import { Card } from './card';

export class Deck{

    contents: Card[] = [];

    constructor(private id: string){
    }
    
    addCard(card: Card){
        this.contents.push(card);
    }

    addCardToDeck(thisCard: HTMLDivElement){
        let deck = document.getElementById(this.id);
        deck.appendChild(thisCard);
        console.log(thisCard.id+"->"+this.id);
    }
    

    getTopCard(){
        return this.contents.pop().body;
    }

    isEmpty(): boolean{
        if(this.contents.length == 0){
          return true;
        }
        return false;
    }
}