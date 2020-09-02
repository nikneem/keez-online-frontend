import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { FriendshipsService } from '@services/friendships.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';
import {
    keezFriendshipActions,
    GetPendingFriendshipInvitations,
    GetPendingFriendshipInvitationsComplete,
    GenericFriendshipFailed,
    ProcessPendingInvitation,
    ProcessPendingInvitationComplete,
    GetFriendshipsList,
    GetFriendshipsListComplete
} from './friendship.actions';

@Injectable()
export class KeezFriendshipEffects {
    constructor(
        private actions$: Actions,
        private friendshipsService: FriendshipsService,
        private errorService: ErrorService
    ) {}

    @Effect()
    getList$: Observable<Action> = this.actions$.pipe(
        ofType<GetFriendshipsList>(keezFriendshipActions.getList),
        debounceTime(300),
        switchMap((action) =>
            this.friendshipsService.list().pipe(
                map((res) => new GetFriendshipsListComplete(res)),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);
                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) =>
                                    of(new GenericFriendshipFailed(msg))
                                )
                            );
                    }
                    return of(new GenericFriendshipFailed(error.message));
                })
            )
        )
    );

    @Effect()
    getPendingInvitations$: Observable<Action> = this.actions$.pipe(
        ofType<GetPendingFriendshipInvitations>(
            keezFriendshipActions.getPendingInvitations
        ),
        debounceTime(300),
        switchMap((action) =>
            this.friendshipsService.listInvitations().pipe(
                map((res) => new GetPendingFriendshipInvitationsComplete(res)),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);
                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) =>
                                    of(new GenericFriendshipFailed(msg))
                                )
                            );
                    }
                    return of(new GenericFriendshipFailed(error.message));
                })
            )
        )
    );

    @Effect()
    processPendingInvitation$: Observable<Action> = this.actions$.pipe(
        ofType<ProcessPendingInvitation>(
            keezFriendshipActions.processPendingInvitation
        ),
        debounceTime(300),
        switchMap((action) =>
            this.friendshipsService.put(action.dto).pipe(
                map((res) => new ProcessPendingInvitationComplete(action.dto)),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);
                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) =>
                                    of(new GenericFriendshipFailed(msg))
                                )
                            );
                    }
                    return of(new GenericFriendshipFailed(error.message));
                })
            )
        )
    );
}
