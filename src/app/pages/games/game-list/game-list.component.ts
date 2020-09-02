import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameListItemDto } from '@store/games-state/games.models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Router } from '@angular/router';

@Component({
    selector: 'keez-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
    games: Array<GameListItemDto>;
    private gamesSubscription: Subscription;

    constructor(private store: Store<AppState>, private router: Router) {}

    gotoGameDetails(game: GameListItemDto) {
        this.router.navigate(['/games', game.id]);
    }

    ngOnInit(): void {
        this.gamesSubscription = this.store
            .select((str) => str.gamesState.games)
            .subscribe((val) => (this.games = val));
    }
    ngOnDestroy(): void {
        this.gamesSubscription.unsubscribe();
    }
}
