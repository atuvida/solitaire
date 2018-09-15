import { Card } from './card';

export class Deck{

    cards: Card[] = [];

    constructor(private _id: string){
    }
    
    addCard(card: Card): void{
        this.cards.push(card);
        console.log('added '+card.id+" to "+this.id);
    }
    
    get topCard(): Card{
        return this.cards.pop();
    }

    isEmpty(): boolean{
        return this.cards.length == 0;
    }

    get size(): number{
        return this.cards.length;
    }

    get id(): string{
        return this._id;
    }

    flipTop(): void{
        let top = this.cards.slice(this.size-1, this.size);
        top[0].flip();
    }
}