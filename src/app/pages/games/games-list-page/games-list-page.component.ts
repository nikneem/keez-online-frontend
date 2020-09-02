import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GamesGetList } from '@store/games-state/games.actions';

@Component({
    selector: 'keez-games-list-page',
    templateUrl: './games-list-page.component.html',
    styleUrls: ['./games-list-page.component.scss']
})
export class GamesListPageComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    private isLoadingSubscription: Subscription;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.isLoadingSubscription = this.store
            .select((str) => str.gamesState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.store.dispatch(new GamesGetList());
    }
    ngOnDestroy(): void {
        this.isLoadingSubscription.unsubscribe();
    }
}
