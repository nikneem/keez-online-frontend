import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { GamesService } from '@services/games.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    keezGameCardsActions,
    GameCardsGetList,
    GameCardsGetListComplete
} from './game-cards.actions';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import {
    GamesGetListComplete,
    GenericGamesFailed
} from '@store/games-state/games.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';

@Injectable()
export class KeezGameCardsEffects {
    constructor(
        private actions$: Actions,
        private errorService: ErrorService,
        private gamesService: GamesService
    ) {}

    @Effect()
    getList$: Observable<Action> = this.actions$.pipe(
        ofType<GameCardsGetList>(keezGameCardsActions.getList),
        debounceTime(300),
        switchMap((action) =>
            this.gamesService.getCards(action.gameId).pipe(
                map((res) => new GameCardsGetListComplete(res)),
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
