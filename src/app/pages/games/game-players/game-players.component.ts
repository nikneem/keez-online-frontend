import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import {
    GamePlayersDto,
    PlayerDto,
    GamePlayerSetReadyDto,
    GameDetailsDto
} from '@store/games-state/games.models';
import { UserProfileDto } from '@store/user-state/user.models';
import {
    GamePlayersSetReady,
    GamePlayersGetList
} from '@store/game-players-store/game-players.actions';

@Component({
    selector: 'keez-game-players',
    templateUrl: './game-players.component.html',
    styleUrls: ['./game-players.component.scss']
})
export class GamePlayersComponent implements OnInit, OnDestroy {
    game: GameDetailsDto;
    loading = true;
    private playersSubscription: Subscription;
    private gameSubscription: Subscription;
    private loadingSubscription: Subscription;
    private userProfileSubscription: Subscription;

    gamePlayers: GamePlayersDto;
    userProfile: UserProfileDto;

    constructor(private store: Store<AppState>) {}

    setPlayerReady(player: PlayerDto) {
        const dto = new GamePlayerSetReadyDto({
            gameId: this.game.id,
            playerId: player.id,
            isReady: true
        });
        this.store.dispatch(new GamePlayersSetReady(dto));
    }

    ngOnInit(): void {
        this.gameSubscription = this.store
            .select((str) => str.gamesState.currentGame)
            .subscribe((val) => {
                this.game = val;
                if (this.game) {
                    this.store.dispatch(new GamePlayersGetList(this.game.id));
                }
            });
        this.loadingSubscription = this.store
            .select((str) => str.gamePlayersState.isLoading)
            .subscribe((val) => (this.loading = val));
        this.playersSubscription = this.store
            .select((str) => str.gamePlayersState.players)
            .subscribe((val) => (this.gamePlayers = val));
        this.userProfileSubscription = this.store
            .select((str) => str.userState.userProfile)
            .subscribe((val) => (this.userProfile = val));
    }
    ngOnDestroy(): void {
        this.playersSubscription.unsubscribe();
        this.gameSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.userProfileSubscription.unsubscribe();
    }
}
