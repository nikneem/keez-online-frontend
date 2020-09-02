import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { GamesService } from '@services/games.service';
import { PlayersService } from '@services/players.service';
import { BoardPositionsService } from '@services/board-positions.service';
import { Observable, of } from 'rxjs';
import {
    keezGamesActions,
    GenericGamesFailed
} from '@store/games-state/games.actions';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';
import { Action } from '@ngrx/store';
import {
    GamePlayersGetList,
    keezGamePlayersActions,
    GamePlayersSetReady,
    GamePlayersSetReadyComplete,
    GamePlayersGetListComplete
} from './game-players.actions';

@Injectable()
export class KeezGamePlayersEffects {
    constructor(
        private actions$: Actions,
        private errorService: ErrorService,
        private gamesService: GamesService,
        private playersService: PlayersService
    ) {}

    @Effect()
    getList$: Observable<Action> = this.actions$.pipe(
        ofType<GamePlayersGetList>(keezGamePlayersActions.getList),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.getPlayers(action.gameId).pipe(
                map((res) => new GamePlayersGetListComplete(res)),
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

    @Effect()
    setReady$: Observable<Action> = this.actions$.pipe(
        ofType<GamePlayersSetReady>(keezGamePlayersActions.setReady),
        debounceTime(300),
        switchMap((action) =>
            this.playersService.setReady(action.dto).pipe(
                map(() => new GamePlayersSetReadyComplete()),
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
