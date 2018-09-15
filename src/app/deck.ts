import { TalonComponent } from './talon/talon.component';
import { style } from '@angular/animations';
import { Card } from './card';

export class Deck{

    cards: Card[] = [];

    constructor(private id: string){
    }

    addCard(card: Card): void{
        this.cards.push(card);
    }

    addCardToDeck(card: Card): void{
        let hostDeck = document.getElementById(this.id);
        let cardBody = card.body;
        hostDeck.appendChild(cardBody);
    }

    getTopCard(): Card{
        return this.cards.pop();
    }

    isEmpty(): boolean{
        if(this.cards.length == 0){
          return true;
        }
        return false;
    }

    get size(): number{
        return this.cards.length;
    }

    flipTop(){
        let hostDeck = document.getElementById(this.id);
        let childCnt = hostDeck.children.length;
        let top = hostDeck.children[childCnt-1];
        let topCard = document.getElementById(top.id);
        let cardInfo = top.id.split("_");
        let suit = cardInfo[0];
        let rank = cardInfo[1];
        topCard.style.backgroundImage = "url(\"./assets/img/cards/"+suit+"/"+top.id+".png\")";
    }
}