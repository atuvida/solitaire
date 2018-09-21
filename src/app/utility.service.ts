import { GameLog } from './utility.service';
import { Card } from './card';
import { Deck } from './deck';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface GameLog {
  DestDeck: Deck;
  Card?: Card;
  CardSet?: Card[];
  SourceDeck: Deck;
  Msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  overlayText: string[] = ['Klondike Solitaire'];
  winGameTexts: string[] = ['You\'re Awesome!', 'You Won!', 'Congratulations!', 'Good Job!'];
  currentWinText: string = '';
  gameLogs: GameLog[] = [];


  constructor() { }

  private statusSubject = new Subject<boolean>();
 
  createLog(source: Deck, target: Deck, card: Card, cardset?:Card[]) {

    let log: GameLog = {SourceDeck: source, DestDeck: target, Card: card, CardSet: cardset, Msg: ""};

    let cardsToStrings = "";
    if(log.Card !== undefined){
      cardsToStrings += log.Card.toString();
    }
    if(log.CardSet !== undefined){
      for(let i=0; i<log.CardSet.length; i++){
        cardsToStrings += log.CardSet[i].toString();
      }
    }
    log.Msg = "Added "+cardsToStrings+" FROM "+log.SourceDeck.id+" TO "+log.DestDeck.id;
    console.log("log created "+log.Msg);
    this.gameLogs.push(log);
  }

  clearLog() {
    this.gameLogs = [];
  }

  getLog(): GameLog {
      return this.gameLogs.pop();
  }

  setStatus(status: boolean) {
    this.statusSubject.next(status);
  }
  
  getStatus(): Observable<any> {
    return this.statusSubject.asObservable();
}


  updateWinTexts(): void{
    this.currentWinText = this.winGameTexts[Math.floor(Math.random() * this.winGameTexts.length)];
  }

  gameWon(): void{
    this.updateWinTexts();
    this.setStatus(true);
    this.overlayText.pop();
    this.overlayText.push(this.currentWinText);
  }


  
}