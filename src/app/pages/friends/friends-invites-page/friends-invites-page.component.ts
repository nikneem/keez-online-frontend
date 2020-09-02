import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import {
    GetPendingFriendshipInvitations,
    ProcessPendingInvitation
} from '@store/friendship-state/friendship.actions';
import { Subscription } from 'rxjs';
import {
    PendingFriendshipInvitationDto,
    FriendshipRequestApprovalDto
} from '@store/friendship-state/friendship.models';

@Component({
    selector: 'keez-friends-invites-page',
    templateUrl: './friends-invites-page.component.html',
    styleUrls: ['./friends-invites-page.component.scss']
})
export class FriendsInvitesPageComponent implements OnInit, OnDestroy {
    private errorSubscription: Subscription;
    private loadingSubscription: Subscription;
    private pendingInvitationsSubscription: Subscription;

    errorMessage: string;
    isLoading: boolean;
    pendingInvitations: Array<PendingFriendshipInvitationDto>;
    displayedColumns: string[] = ['name', 'expiresOn', 'actions'];

    constructor(public store: Store<AppState>) {}

    loadList() {
        this.store.dispatch(new GetPendingFriendshipInvitations());
    }
    acceptInvitation(element: PendingFriendshipInvitationDto) {
        const approvalMessage = new FriendshipRequestApprovalDto({
            id: element.id,
            isApproved: true
        });
        this.SendInvitationResponse(approvalMessage);
    }
    declineInvitation(element: PendingFriendshipInvitationDto) {
        const declineMessage = new FriendshipRequestApprovalDto({
            id: element.id,
            isApproved: false
        });
        this.SendInvitationResponse(declineMessage);
    }
    private SendInvitationResponse(dto: FriendshipRequestApprovalDto) {
        this.store.dispatch(new ProcessPendingInvitation(dto));
    }

    ngOnInit(): void {
        this.loadList();
        this.errorSubscription = this.store
            .select((str) => str.friendshipState.errorMessage)
            .subscribe((val) => (this.errorMessage = val));
        this.loadingSubscription = this.store
            .select((str) => str.friendshipState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.pendingInvitationsSubscription = this.store
            .select((str) => str.friendshipState.pendingInvitations)
            .subscribe((val) => (this.pendingInvitations = val));
    }
    ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.pendingInvitationsSubscription.unsubscribe();
    }
}
