import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { FriendshipInvitationRequestDto } from '@store/friendship-invitation-state/friendship-invitation.models';
import {
    FriendsInvitationsSend,
    keezFriendsInvitationsActions
} from '@store/friendship-invitation-state/friendship-invitation.actions';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'keez-invite-friend',
    templateUrl: './invite-friend.component.html',
    styleUrls: ['./invite-friend.component.scss']
})
export class InviteFriendComponent implements OnInit, OnDestroy {
    private actionSubscription: Subscription;
    private loadingSubscription: Subscription;
    private errorSubscription: Subscription;

    friendshipForm: FormGroup;
    isLoading: boolean;
    errorMessage: string;

    constructor(
        private store: Store<AppState>,
        private actions: Actions,
        private dialogRef: MatDialogRef<InviteFriendComponent>
    ) {}

    createForm() {
        this.friendshipForm = new FormGroup({
            friendshipId: new FormControl('', [Validators.required])
        });
    }
    inviteFriend() {
        if (this.friendshipForm.valid) {
            const dto = new FriendshipInvitationRequestDto(
                this.friendshipForm.value
            );
            this.store.dispatch(new FriendsInvitationsSend(dto));
        }
    }
    cancel() {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.createForm();

        this.loadingSubscription = this.store
            .select((str) => str.friendshipInvistaionsState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.errorSubscription = this.store
            .select((str) => str.friendshipInvistaionsState.errorMessage)
            .subscribe((val) => (this.errorMessage = val));

        this.actionSubscription = this.actions
            .pipe(ofType(keezFriendsInvitationsActions.sendCompleted))
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
    ngOnDestroy() {
        this.actionSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }
}
