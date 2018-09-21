import { UtilityService } from './utility.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DraggableModule } from './draggable/draggable.module';
import { GameControlService } from './game-control.service';
import { DeckService } from './deck.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoundationComponent } from './foundation/foundation.component';
import { ManeuverComponent } from './maneuver/maneuver.component';
import { TalonComponent } from './talon/talon.component';
import { WasteComponent } from './waste/waste.component';
import { MenuComponent } from './menu/menu.component';
import { OverlayComponent } from './overlay/overlay.component';
import { GameLogsComponent } from './game-logs/game-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    FoundationComponent,
    ManeuverComponent,
    TalonComponent,
    WasteComponent,
    MenuComponent,
    OverlayComponent,
    GameLogsComponent
  ],
  imports: [
    BrowserModule, 
    DraggableModule,
    BrowserAnimationsModule
  ],
  providers: [DeckService, GameControlService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
