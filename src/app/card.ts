import { COLOR, SUIT, RANK } from './enums/enums';

export class Card {

  constructor(private suit: number, private rank: number) {
  }
  private color = (this.suit == SUIT.DIAMONDS || this.suit == SUIT.HEARTS) ? COLOR.Red : COLOR.Black;
  private _id = this.suit + "_" + this.rank;

  private _flipped: boolean = false;

  get Suit() {
    return this.suit;
  }

  get Rank() {
    return this.rank;
  }
  get Color() {
    return this.color;
  }
  get id() {
    return this._id;
  }

  get flipped(): boolean {
    return this._flipped;
  }

  flip(): void {
    if (!this._flipped) {
      this._flipped = true;
      return;
    }
    this._flipped = false;
  }

  toString(): string {
    let rank = this.rank;
    let rankSymbol: string = "";

    switch (rank) {
      case 0: rankSymbol = "ACE";
        break;
      case 10: rankSymbol = "JACK";
        break;
      case 11: rankSymbol = "QUEEN";
        break;
      case 12: rankSymbol = "KING";
        break;
      default: rankSymbol += rank+1;
        break;
    }

    return "[ " + rankSymbol + " of " + SUIT[this.suit] + " ]";
  }
}