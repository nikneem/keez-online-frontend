import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import {
    GamesCreateNew,
    keezGamesActions,
    GamesCreateNewComplete,
    GenericGamesFailed,
    GamesGetList,
    GamesGetListComplete,
    GamesGetBoardPositions,
    GamesGetBoardPositionsComplete,
    GamesGetPawnPositions,
    GamesGetPawnPositionsComplete,
    GamesGetDetails,
    GamesGetDetailsComplete
} from './games.actions';
import { GamesService } from '@services/games.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';
import { BoardPositionsService } from '@services/board-positions.service';
import { PlayersService } from '@services/players.service';

@Injectable()
export class KeezGamesEffects {
    constructor(
        private actions$: Actions,
        private errorService: ErrorService,
        private gamesService: GamesService,
        private playersService: PlayersService,
        private boardPositionsService: BoardPositionsService
    ) {}

    @Effect()
    getList$: Observable<Action> = this.actions$.pipe(
        ofType<GamesGetList>(keezGamesActions.getList),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.get().pipe(
                map((res) => new GamesGetListComplete(res)),
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
    getDetails$: Observable<Action> = this.actions$.pipe(
        ofType<GamesGetDetails>(keezGamesActions.getDetails),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.getDetails(action.id).pipe(
                map((res) => new GamesGetDetailsComplete(res)),
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
    createNew$: Observable<Action> = this.actions$.pipe(
        ofType<GamesCreateNew>(keezGamesActions.createNew),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.post(action.dto).pipe(
                map((res) => new GamesCreateNewComplete(res)),
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
    getBoardPositions$: Observable<Action> = this.actions$.pipe(
        ofType<GamesGetBoardPositions>(keezGamesActions.getBoardPositions),
        debounceTime(300),
        switchMap((action) =>
            this.boardPositionsService.get().pipe(
                map((res) => new GamesGetBoardPositionsComplete(res)),
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
    getPawnPositions$: Observable<Action> = this.actions$.pipe(
        ofType<GamesGetPawnPositions>(keezGamesActions.getPawnPositions),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.getPawns(action.gameId).pipe(
                map((res) => new GamesGetPawnPositionsComplete(res)),
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
