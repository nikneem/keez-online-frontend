import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorService } from '@services/error.service';
import { FriendshipsService } from '@services/friendships.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    keezFriendsInvitationsActions,
    FriendsInvitationsSend,
    FriendsInvitationsSendCompleted,
    FriendsInvitationsSendFailed
} from './friendship-invitation.actions';
import {
    debounceTime,
    switchMap,
    map,
    catchError,
    flatMap
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';

@Injectable()
export class KeezFriendshipInvitationEffects {
    constructor(
        private actions$: Actions,
        private friendshipsService: FriendshipsService,
        private errorService: ErrorService
    ) {}

    @Effect()
    send$: Observable<Action> = this.actions$.pipe(
        ofType<FriendsInvitationsSend>(keezFriendsInvitationsActions.send),
        debounceTime(300),
        switchMap((action) =>
            this.friendshipsService.post(action.dto).pipe(
                map((res) => new FriendsInvitationsSendCompleted()),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);
                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) =>
                                    of(new FriendsInvitationsSendFailed(msg))
                                )
                            );
                    }
                    return of(new FriendsInvitationsSendFailed(error.message));
                })
            )
        )
    );
}
