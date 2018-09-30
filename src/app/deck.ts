import { DeckTypes, RANK } from './enums/enums';
import { DeckService } from './deck.service';
import { UtilityService } from './utility.service';
import { Card } from './card';

export class Deck {

  cards: Card[] = [];

  constructor(private _id: string, private _type: DeckTypes, 
    private deckService?: DeckService, 
    private utilityService?: UtilityService) {
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  removeTop(): Card {
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

  get topCard(): Card {
    return this.cards[this.size-1];
  }

  flipTop(): void {
    this.topCard.flip();
  }

  get type(): number {
    return this._type;
  }

  createSetFromIndex(index: number): Card[] {
    return this.cards.splice(index + 1, this.size - index);
  }

  addSet(cardset: Card[]): void {
    while (cardset.length > 0) {
      this.addCard(cardset.splice(0, 1)[0]);
    }
  }

  contains(card: Card): boolean {
    return this.cards.indexOf(card) !== -1;
  }

  cardIndex(card: Card): number {
    return this.cards.indexOf(card);
  }

  canAccept(card: Card): boolean{
    if(this.type == DeckTypes.Foundation){
      if(this.isEmpty() && card.Rank == RANK.Ace){
        return true;
      }
      if(!this.isEmpty() && card.Rank == this.topCard.Rank+1 && card.Suit == this.topCard.Suit){
        return true;
      }
      return false;
    }

    if(this.type == DeckTypes.Maneuver){
      if(this.isEmpty() && card.Rank == RANK.King){
        return true;
      }
      if(!this.isEmpty() && card.Color !== this.topCard.Color && card.Rank == this.topCard.Rank-1){
        return true;
      }
      return false;
    }
  }

  clear(){
    this.cards = [];
    while(!this.isEmpty()){
      this.removeTop();
    }
  }

  get nextTop(): Card{
    return this.cards[this.size-2];
  }

  get baseCard(): Card{
    return this.cards[0];
  }
}