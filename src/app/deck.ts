import { RANK } from './enums/ranks';
import { DeckTypes } from './enums/deckTypes';
import { Card } from './card';

export class Deck {

  cards: Card[] = [];

  constructor(private _id: string, private _type: DeckTypes) {
  }

  addCard(card: Card): void {
    this.cards.push(card);
    console.log('added ' + card.id + " to " + this.id);
  }

  getTopCard(): Card {
    return this.cards.pop();
  }

  isEmpty(): boolean {
    return this.cards.length == 0;
  }

  get size(): number {
    return this.cards.length;
  }

  get id(): string {
    return this._id;
  }

  get top(): Card {
    let top = this.cards.slice(this.size - 1, this.size);
    return top[0];
  }

  flipTop(): void {
    this.top.flip();
  }

  get type(): number {
    return this._type;
  }

  createSetAfter(index: number): Card[] {
    return this.cards.splice(index + 1, this.size - index);
  }

  addSet(cardset: Card[]): void {
    while (cardset.length > 0) {
      this.cards.push(cardset.splice(0, 1)[0]);
    }
  }

  contains(card: Card): boolean {
    return this.cards.indexOf(card) !== -1;
  }

  cardIndex(card: Card): number {
    return this.cards.indexOf(card);
  }

  isCardPlayable(card: Card): boolean{
    if(this.type == DeckTypes.Foundation){
      if(this.isEmpty() && card.Rank == RANK.Ace){
        return true;
      }
      if(!this.isEmpty() && card.Rank == this.top.Rank+1 && card.Suit == this.top.Suit){
        return true;
      }
      return false;
    }

    if(this.type == DeckTypes.Maneuver){
      if(this.isEmpty() && card.Rank == RANK.King){
        return true;
      }
      if(!this.isEmpty() && card.Color !== this.top.Color && card.Rank == this.top.Rank-1){
        return true;
      }
      return false;
    }
  }

}