import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { BoardPositionDto, GamePawnDto } from '@store/games-state/games.models';
import {
    GamesGetBoardPositions,
    GamesGetPawnPositions
} from '@store/games-state/games.actions';
import { GameTurnsSelectPawn } from '@store/game-turns-store/game-turns.actions';

@Component({
    selector: 'keez-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {
    boardPositions: Array<BoardPositionDto>;
    pawns: Array<GamePawnDto>;
    gameId: string;
    private isLoaded: boolean;
    private boardPositionsSubscription: Subscription;
    private pawnsSubscription: Subscription;
    private gameDetailsSubscription: Subscription;
    constructor(private store: Store<AppState>) {}

    selectPawn(pawn: GamePawnDto) {
        this.store.dispatch(new GameTurnsSelectPawn(pawn));
    }

    ngOnInit(): void {
        this.boardPositionsSubscription = this.store
            .select((str) => str.gamesState.boardPositions)
            .subscribe((val) => {
                if (!val && !this.isLoaded) {
                    this.isLoaded = true;
                    this.store.dispatch(new GamesGetBoardPositions());
                }
                this.boardPositions = val;
            });
        this.gameDetailsSubscription = this.store
            .select((str) => str.gamesState.currentGameId)
            .subscribe((val) => {
                this.gameId = val;
                if (this.gameId) {
                    this.store.dispatch(new GamesGetPawnPositions(this.gameId));
                }
            });
        this.pawnsSubscription = this.store
            .select((str) => str.gamesState.pawns)
            .subscribe((val) => {
                this.pawns = val;
            });
    }
    ngOnDestroy(): void {
        this.boardPositionsSubscription.unsubscribe();
        this.pawnsSubscription.unsubscribe();
        this.gameDetailsSubscription.unsubscribe();
    }
}
