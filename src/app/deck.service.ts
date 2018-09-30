import { DeckTypes, RANK, SUIT } from './enums/enums';
import { UtilityService } from './utility.service';
import { Deck } from './deck';
import { Card } from './card';
import { Injectable } from '@angular/core';

const maxRank = 13, maxSuit = 4;
const maneuverCount = 7, foundationCount = 4;

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor(private utilityService: UtilityService) { }

  mainDeck: Deck;
  mainDeckCopy: Deck = new Deck('deckCopy', DeckTypes.Main);
  talon: Deck = new Deck('TALON', DeckTypes.Talon);
  waste: Deck = new Deck('WASTE', DeckTypes.Waste);
  maneuvers: Deck[] = [];
  foundations: Deck[] = [];
  hintsCheck: boolean = false;

  generateMainDeck(): void {

    let maxRank = Object.keys(RANK).length / 2.
    let maxSuit = Object.keys(SUIT).length / 2.

    this.mainDeck = new Deck('Main', DeckTypes.Main);

    for (let rank = 0; rank < maxRank; rank++) {
      for (let suit = 0; suit < maxSuit; suit++) {
        let card = new Card(suit, rank);
        this.mainDeck.addCard(card);
      }
    }
  }

  createGameDecks() {
    for (let i = 0; i < maneuverCount; i++) {
      let maneuver = new Deck('MANEUVER' + (i + 1), DeckTypes.Maneuver);
      this.maneuvers.push(maneuver);
    }

    for (let i = 0; i < foundationCount; i++) {
      let foundation = new Deck('FOUNDATION' + (i + 1), DeckTypes.Foundation, this, this.utilityService);
      this.foundations.push(foundation);
    }
  }

  shuffleDeckCards(): void {
    for (let i = this.mainDeck.size - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.mainDeck.cards[i];
      this.mainDeck.cards[i] = this.mainDeck.cards[j];
      this.mainDeck.cards[j] = temp;
    }
  }

  distributeCards() {
    for (let i = 0; i < this.maneuvers.length; i++) {
      for (let j = i; j < this.maneuvers.length; j++) {
        let topCard = this.mainDeck.removeTop();
        let maneuver = this.maneuvers[j];
        maneuver.addCard(topCard);
      }
      this.maneuvers[i].flipTop();
    }

    while (!this.mainDeck.isEmpty()) {
      let topCard = this.mainDeck.removeTop();
      this.talon.addCard(topCard);
    }
  }

  autoPlayCard(card: Card, sourceDeck: Deck): void {
    let DeckAreas = [this.foundations, this.maneuvers];
    for (let i = 0; i < DeckAreas.length; i++) {
      for (let j = 0; j < DeckAreas[i].length; j++) {
        let deck = DeckAreas[i][j];
        if (deck.canAccept(card)) {
          if (this.hintsCheck) {
            if (sourceDeck.size >= 2
              && sourceDeck.nextTop.flipped
              && sourceDeck.type !== DeckTypes.Waste) {

            } else {
              this.utilityService.createHint(sourceDeck, card, deck);
            }
            return;
          }
          sourceDeck.removeTop();
          deck.addCard(card);
          if (sourceDeck.type == DeckTypes.Maneuver
            && !sourceDeck.isEmpty()
            && !sourceDeck.topCard.flipped) {
            sourceDeck.flipTop();
          }
          
          if(this.allCardsFlipped()){
            this.clearManeuvers();
            this.utilityService.gameWon();
            return;
          }
          this.suggestNextMove();
          this.utilityService.createLog(sourceDeck, deck, card);
          return;
        }
      }
    }
  }
  
    index = 0;
   clearManeuvers(){
    let cardsToClear = 0;
  
    for(let i=0; i<this.maneuvers.length; i++){
      cardsToClear += this.maneuvers[i].size;
    }
    
    if(cardsToClear > 0){
      let deck = this.maneuvers[this.index];
      if(this.index < 6){
        this.index++;
      }else{
        this.index = 0;
      }
      if(!deck.isEmpty()){
        this.autoPlayCard(deck.topCard, deck);
        setTimeout(() => {
          this.clearManeuvers();
        }, 300);
      }else{
        this.clearManeuvers();
      }
    }
  }

  suggestNextMove() {
    this.utilityService.clearHints();
    for (let i = 0; i < this.maneuvers.length; i++) {
      if (!this.maneuvers[i].isEmpty()) {
        let card = this.maneuvers[i].topCard;
        this.hintsCheck = true;
        this.autoPlayCard(card, this.maneuvers[i]);
      }
    }
    if (!this.waste.isEmpty()) {
      let card = this.waste.topCard;
      this.hintsCheck = true;
      this.autoPlayCard(card, this.waste);
    }
    if (this.utilityService.gameHints.length == 0) {
      this.utilityService.noSuggestedMove();
    }

    this.hintsCheck = false;
  }

  maneuversCleared(): boolean {
    for (let i = 0; i < this.maneuvers.length; i++) {
      if (!this.maneuvers[i].isEmpty()) {
        return false;
      }
    }
    return true;
  }

  foundationsComplete(): boolean {
    for (let i = 0; i < this.foundations.length; i++) {
      if (this.foundations[i].size < 13) {
        return false;
      }
    }
    return true;
  }

  allCardsFlipped(): boolean {
    if (!this.talon.isEmpty() || !this.waste.isEmpty()) {
      return false;
    }

    for (let i = 0; i < this.maneuvers.length; i++) {
      if (!this.maneuvers[i].isEmpty()) {
        if (!this.maneuvers[i].baseCard.flipped) {
          return false;
        }
      }
    }
    return true;
  }

  clearDecks() {
    let foundManDecks = [this.foundations, this.maneuvers];
    for (let i = 0; i < foundManDecks.length; i++) {
      for (let j = 0; j < foundManDecks[i].length; j++) {
        foundManDecks[i][j].clear();
      }
    }
    this.talon.clear();
    this.waste.clear();
    this.mainDeck.clear();
  }

  copyDeck(targetDeck: Deck, deckSource: Deck) {
    let index = 0;
    while (index < deckSource.size) {
      if (deckSource.cards[index].flipped) {
        deckSource.cards[index].flip();
      }
      targetDeck.addCard(deckSource.cards[index]);
      index++;
    }
  }
}
