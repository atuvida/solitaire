enum COLOR{Red = 0, Black = 1};
enum SUIT{Spade = 0, Club = 1, Diamond = 2, Heart = 3};

export class Card{

    constructor(private suit: number, private rank: number){
    }
    private color = (this.suit == SUIT.Diamond || this.suit == SUIT.Heart) ? COLOR.Red : COLOR.Black;
    private _id = this.suit+"_"+this.rank;

    private _flipped: boolean = false;

    get Suit(){
        return this.suit;
    }
    get Rank(){
        return this.rank;
    }
    get Color(){
        return this.color;
    }
    get id(){
        return this._id;
    }

    get flipped(): boolean{
        return this._flipped;
    }

    flip(): void{
        this._flipped = true;
        console.log('flipped '+this.id);
    }
}