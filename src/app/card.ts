
    enum COLOR{Red = 0, Black = 1};
    enum SUIT{Heart = 0, Diamond = 1, Spade = 2, Club = 3};

export class Card{

    constructor(private suit: number, private rank: number){
    }
    
    private color = (this.suit == SUIT.Diamond || this.suit == SUIT.Heart) ? COLOR.Red : COLOR.Black;
    
    get body(){
        let body = document.createElement('div');
        let suit = this.suit;
        let rank = this.rank;
        body.className = "cards";
        body.id = suit+"_"+rank;
        body.style.backgroundImage = "url('./assets/img/cards/"+suit+"/"+body.id+".png')";
        return body;
    }
    getSuit(){
        return this.suit;
    }
    getRank(){
        return this.rank;
    }
    getColor(){
        return this.color;
    }
}