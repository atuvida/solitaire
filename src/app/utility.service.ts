import { Card } from './card';
import { Deck } from './deck';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  overlayText: string[] = ['Klondike Solitaire'];
  winGameTexts: string[] = ['You\'re Awesome!', 'You Won!', 'Congratulations!', 'Good Job!'];
  currentWinText: string = '';
  gamePromptTexts: string[] = ['Play Again?', 'Restart Game?','Game Paused'];

  constructor() { }

  private logSubject = new Subject<any>();
  private statusSubject = new Subject<boolean>();
 
  createLog(source: Deck, card: Card[], destDeck: Deck) {
      this.logSubject.next({ source: source, cards: card, destDeck: destDeck });
  }

  clearLog() {
      this.logSubject.next();
  }

  getLog(): Observable<any> {
      return this.logSubject.asObservable();
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