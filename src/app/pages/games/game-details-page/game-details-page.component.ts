import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SignalrService } from '@services/signalr.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { UserProfileDto } from '@store/user-state/user.models';
import {
    GamesSetCurrentGameId,
    GamesGetDetails
} from '@store/games-state/games.actions';

@Component({
    selector: 'keez-game-details-page',
    templateUrl: './game-details-page.component.html',
    styleUrls: ['./game-details-page.component.scss']
})
export class GameDetailsPageComponent implements OnInit, OnDestroy {
    gameId: string;
    isLoading: boolean;

    private userProfile: UserProfileDto;

    private userProfileSubscription: Subscription;
    private gameIdSubscription: Subscription;
    constructor(
        private route: ActivatedRoute,
        private signalRService: SignalrService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((val) =>
            this.store.dispatch(new GamesSetCurrentGameId(val.get('id')))
        );

        this.gameIdSubscription = this.store
            .select((str) => str.gamesState.currentGameId)
            .subscribe((val) => {
                this.gameId = val;
                if (this.gameId) {
                    if (this.userProfile && this.signalRService.isConnected()) {
                        console.log(
                            'SignalR is connected, now joining game group'
                        );
                        this.signalRService
                            .joinGroup(this.gameId, this.userProfile.id)
                            .subscribe((res) => {
                                console.log(res.ok);
                            });
                    }
                    this.store.dispatch(new GamesGetDetails(this.gameId));
                }
            });
        this.userProfileSubscription = this.store
            .select((str) => str.userState.userProfile)
            .subscribe((val) => {
                this.userProfile = val;
            });
    }
    ngOnDestroy(): void {
        this.gameIdSubscription.unsubscribe();
        this.userProfileSubscription.unsubscribe();
    }
}
