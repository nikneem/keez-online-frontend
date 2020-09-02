import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendshipDto } from '@store/friendship-state/friendship.models';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GetFriendshipsList } from '@store/friendship-state/friendship.actions';

@Component({
    selector: 'keez-friends-list-page',
    templateUrl: './friends-list-page.component.html',
    styleUrls: ['./friends-list-page.component.scss']
})
export class FriendsListPageComponent implements OnInit, OnDestroy {
    private errorSubscription: Subscription;
    private loadingSubscription: Subscription;
    private pendingInvitationsSubscription: Subscription;

    errorMessage: string;
    isLoading: boolean;
    friendships: Array<FriendshipDto>;
    displayedColumns: string[] = ['name', 'actions'];

    constructor(public store: Store<AppState>) {}

    loadList() {
        this.store.dispatch(new GetFriendshipsList());
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
            .select((str) => str.friendshipState.friendships)
            .subscribe((val) => (this.friendships = val));
    }
    ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.pendingInvitationsSubscription.unsubscribe();
    }
}
