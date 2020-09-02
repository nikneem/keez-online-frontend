import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '@services/users.service';
import { UserProfileDto } from '@store/user-state/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import {
    GetUserProfile,
    UpdateUserProfile,
    UpdateUserProfileComplete,
    keezUsersActions
} from '@store/user-state/user.actions';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'keez-register-new-user',
    templateUrl: './register-new-user.component.html',
    styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent implements OnInit, OnDestroy {
    userProfile: UserProfileDto;

    profileForm: FormGroup;
    profileSubscription: Subscription;
    actionSubscription: Subscription;
    loadingSubscription: Subscription;
    errorSubscription: Subscription;
    isLoading: boolean;
    errorMessage: string;

    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private dialogRef: MatDialogRef<RegisterNewUserComponent>
    ) {}

    createProfileForm() {
        this.profileForm = new FormGroup({
            id: new FormControl(this.userProfile.id),
            subject: new FormControl(this.userProfile.subject),
            friendshipId: new FormControl(this.userProfile.friendshipId),
            picture: new FormControl(this.userProfile.picture),
            name: new FormControl(this.userProfile.name, [Validators.required]),
            emailAddress: new FormControl(this.userProfile.emailAddress, [
                Validators.required,
                Validators.email
            ])
        });
    }

    updateUserProfile() {
        if (this.profileForm.valid) {
            const dto = new UserProfileDto(this.profileForm.value);
            this.store.dispatch(new UpdateUserProfile(dto));
        }
    }

    ngOnInit(): void {
        this.profileSubscription = this.store
            .select((str) => str.userState.userProfile)
            .subscribe((val) => {
                this.userProfile = val;
                if (this.userProfile) {
                    this.createProfileForm();
                }
            });
        this.loadingSubscription = this.store
            .select((str) => str.userState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.errorSubscription = this.store
            .select((str) => str.userState.errorMessage)
            .subscribe((val) => (this.errorMessage = val));

        this.actionSubscription = this.actions
            .pipe(ofType(keezUsersActions.updateProfileComplete))
            .subscribe(() => {
                this.dialogRef.close();
            });

        this.store.dispatch(new GetUserProfile());
    }
    ngOnDestroy(): void {
        this.profileSubscription.unsubscribe();
        this.actionSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }
}
