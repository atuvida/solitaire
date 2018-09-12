import { style } from '@angular/animations';
import { Card } from './card';

export class Deck{

    cards: Card[] = [];

    constructor(private id: string){
    }
    
    addCard(card: Card){
        this.cards.push(card);
    }

    addCardToDeck(thisCard: HTMLDivElement){
        let deck = document.getElementById(this.id);
        deck.appendChild(thisCard);
        console.log(thisCard.id+"->"+this.id);
    }

    getTopCard(){
        return this.cards.pop().body;
    }

    isEmpty(): boolean{
        if(this.cards.length == 0){
          return true;
        }
        return false;
    }
}