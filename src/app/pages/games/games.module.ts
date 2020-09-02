import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListPageComponent } from './games-list-page/games-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GameCreateComponent } from './game-create/game-create.component';
import { KeezGamesEffects } from '@store/games-state/games.effects';
import { EffectsModule } from '@ngrx/effects';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsPageComponent } from './game-details-page/game-details-page.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GamePlayersComponent } from './game-players/game-players.component';
import { GameControlCardsComponent } from './game-control-cards/game-control-cards.component';
import { KeezGameCardsEffects } from '@store/game-cards-store/game-cards.effects';
import { KeezGamePlayersEffects } from '@store/game-players-store/game-players.effects';
import { GameControlTurnsComponent } from './game-control-turns/game-control-turns.component';
import { GameControlMoveDialogComponent } from './game-control-move-dialog/game-control-move-dialog.component';
import { KeezGameTurnsEffects } from '@store/game-turns-store/game-turns.effects';

@NgModule({
    declarations: [
        GamesListPageComponent,
        GameCreateComponent,
        GameListComponent,
        GameDetailsPageComponent,
        GameBoardComponent,
        GameControlsComponent,
        GamePlayersComponent,
        GameControlCardsComponent,
        GameControlTurnsComponent,
        GameControlMoveDialogComponent
    ],
    imports: [
        GamesRoutingModule,
        CommonModule,
        SharedModule,
        TranslateModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([
            KeezGamesEffects,
            KeezGamePlayersEffects,
            KeezGameCardsEffects,
            KeezGameTurnsEffects
        ])
    ],
    exports: [],
    entryComponents: [GameControlMoveDialogComponent]
})
export class GamesModule {}
