import { DraggableModule } from './draggable/draggable.module';
import { GameControlService } from './game-control.service';
import { DeckService } from './deck.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FoundationComponent } from './foundation/foundation.component';
import { ManeuverComponent } from './maneuver/maneuver.component';
import { TalonComponent } from './talon/talon.component';
import { WasteComponent } from './waste/waste.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FoundationComponent,
    ManeuverComponent,
    TalonComponent,
    WasteComponent
  ],
  imports: [
    BrowserModule, DraggableModule
  ],
  providers: [DeckService, GameControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
