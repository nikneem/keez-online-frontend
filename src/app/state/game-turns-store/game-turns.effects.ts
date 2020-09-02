import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { GamesService } from '@services/games.service';
import { PlayersService } from '@services/players.service';
import { Observable, of } from 'rxjs';
import {
    GamePlayersGetList,
    keezGamePlayersActions,
    GamePlayersGetListComplete,
    GamePlayersSetReady,
    GamePlayersSetReadyComplete
} from '@store/game-players-store/game-players.actions';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';
import { GenericGamesFailed } from '@store/games-state/games.actions';
import { Action } from '@ngrx/store';
import {
    keezGameTurnsActions,
    GameTurnsMakeMove,
    GameTurnsMakeMoveSucceeded
} from './game-turns.actions';
import { MovesService } from '@services/moves.service';

@Injectable()
export class KeezGameTurnsEffects {
    constructor(
        private actions$: Actions,
        private errorService: ErrorService,
        private movesService: MovesService
    ) {}

    @Effect()
    makeMove$: Observable<Action> = this.actions$.pipe(
        ofType<GameTurnsMakeMove>(keezGameTurnsActions.makeMove),
        debounceTime(300),
        switchMap((action) =>
            this.movesService.post(action.dto).pipe(
                map((res) => new GameTurnsMakeMoveSucceeded()),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);
                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) =>
                                    of(new GenericGamesFailed(msg))
                                )
                            );
                    }
                    return of(new GenericGamesFailed(error.message));
                })
            )
        )
    );
}
