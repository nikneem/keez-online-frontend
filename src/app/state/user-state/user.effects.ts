import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UsersService } from '@services/users.service';
import { Router } from '@angular/router';
import {
    keezUsersActions,
    UserFromIdentityProvider,
    UserResolveComplete,
    UserResolveFailed,
    GetUserProfile,
    GetUserProfileComplete,
    UserProfileFailed,
    UpdateUserProfile,
    UpdateUserProfileComplete
} from './user.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    switchMap,
    map,
    tap,
    catchError,
    debounceTime,
    flatMap
} from 'rxjs/operators';
import { ErrorService } from '@services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCodeDto } from 'src/app/shared/models/error-models';

@Injectable()
export class KeezUserEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private errorService: ErrorService,
        private router: Router
    ) {}

    @Effect()
    userFromIdentityProvider$: Observable<Action> = this.actions$.pipe(
        ofType<UserFromIdentityProvider>(
            keezUsersActions.userFromIdentityProvider
        ),
        debounceTime(300),
        switchMap((action) =>
            this.usersService.postProfile(action.dto).pipe(
                map(
                    (response) =>
                        new UserResolveComplete(
                            response.body,
                            response.status === 201
                        )
                ),
                catchError((error) => of(new UserResolveFailed(error)))
            )
        )
    );

    @Effect()
    getProfile$: Observable<Action> = this.actions$.pipe(
        ofType<GetUserProfile>(keezUsersActions.getProfile),
        debounceTime(300),
        switchMap((action) =>
            this.usersService.getProfile().pipe(
                map((res) => new GetUserProfileComplete(res)),
                catchError((error) => of(new UserProfileFailed(error)))
            )
        )
    );

    @Effect()
    updateProfile$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateUserProfile>(keezUsersActions.updateProfile),
        debounceTime(300),
        switchMap((action) =>
            this.usersService.putProfile(action.dto).pipe(
                map((res) => new UpdateUserProfileComplete(res)),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        const dto = new ErrorCodeDto(error.error);

                        return this.errorService
                            .getErrorMessage(dto)
                            .pipe(
                                flatMap((msg) => of(new UserProfileFailed(msg)))
                            );
                    }
                    return of(new UserProfileFailed(error.message));
                })
            )
        )
    );
}
