import { GameControlService } from './game-control.service';
import { DeckService } from './deck.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DeckService, GameControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
