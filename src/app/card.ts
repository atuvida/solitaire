
    enum COLOR{Red = 0, Black = 1};
    enum SUIT{Heart = 0, Diamond = 1, Spade = 2, Club = 3};

export class Card{

    constructor(private suit: number, private rank: number){
    }
    
    private color = (this.suit == SUIT.Diamond || this.suit == SUIT.Heart) ? COLOR.Red : COLOR.Black;
    
    private cardHolder = document.createElement('div');
    private id = this.suit+"_"+this.rank;

    get body(){
        let suit = this.suit;
        let rank = this.rank;
        this.cardHolder.className = "faceDown";
        this.cardHolder.id = this.ID;
        this.cardHolder.style.backgroundImage = "url('./assets/img/cards/back.png')";
        return this.cardHolder;
    }
    get Suit(){
        return this.suit;
    }
    get Rank(){
        return this.rank;
    }
    get Color(){
        return this.color;
    }
    get ID(){
        return this.id;
    }
}