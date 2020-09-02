import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameDetailsDto } from '@store/games-state/games.models';
import { UserProfileDto } from '@store/user-state/user.models';
import { GameCardDto } from '@store/game-cards-store/game-cards.models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GameCardsGetList } from '@store/game-cards-store/game-cards.actions';
import {
    GameTurnsReset,
    GameTurnsMakeMove,
    GameTurnsSelectPass
} from '@store/game-turns-store/game-turns.actions';
import { GenericMoveDto } from '@store/game-turns-store/game-turns.models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'keez-game-control-turns',
    templateUrl: './game-control-turns.component.html',
    styleUrls: ['./game-control-turns.component.scss']
})
export class GameControlTurnsComponent implements OnInit, OnDestroy {
    game: GameDetailsDto;
    loading: boolean;

    actionDescription: string;
    errorMessage: string;
    selectSteps: boolean;
    moveIsReadyToSend: boolean;

    private gameIdSubscription: Subscription;
    private gameTurnStateSubscription: Subscription;
    private genericMove: GenericMoveDto;

    constructor(private store: Store<AppState>, private dialog: MatDialog) {}

    getCardImageUrl(card: GameCardDto): string {
        return `/assets/cards/${card.suit}${card.valueInt}.svg`;
    }

    reset() {
        this.store.dispatch(new GameTurnsReset());
    }

    makeMove() {
        this.store.dispatch(new GameTurnsMakeMove(this.genericMove));
    }
    pass() {
        // When the player plays an Ace, a decision is required whether
        // the player wants to advance a pawn, or bring a pawn into play.
        // This check raises a dialog forcing the user to make a choise
        let dialogInstance = this.dialog.open(ConfirmationDialogComponent, {
            width: '460px',
            data: {
                title: 'GamesPage.Turns.PassConfirmationTitle',
                text: 'GamesPage.Turns.PassConfirmationText',
                showCancel: false
            }
        });

        dialogInstance.afterClosed().subscribe((result) => {
            if (result === 'yes') {
                this.store.dispatch(new GameTurnsSelectPass());
            }
        });
    }

    ngOnInit(): void {
        this.gameIdSubscription = this.store
            .select((str) => str.gamesState.currentGame)
            .subscribe((val) => (this.game = val));
        this.gameTurnStateSubscription = this.store
            .select((str) => str.gameTurnsState)
            .subscribe((val) => {
                this.loading = val.isLoading;
                this.actionDescription = val.actionDescription;
                this.selectSteps = val.requestNumberOfSteps;
                this.errorMessage = val.errorMessage;
                this.moveIsReadyToSend = val.isReadyToPlay;
                if (this.game && val) {
                    this.genericMove = new GenericMoveDto({
                        gameId: this.game.id,
                        playerId: this.game.playerId,
                        selectedCardId: val.selectedCard?.id,
                        selectedPawnId: val.selectedPawnId?.id,
                        selectedSecondPawnId: val.selectedSecondPawnId?.id,
                        stepsWithFirstPawn: val.selectedNumberOfSteps
                    });
                } else {
                    this.genericMove = null;
                }
            });
    }
    ngOnDestroy(): void {
        this.gameIdSubscription.unsubscribe();
        this.gameTurnStateSubscription.unsubscribe();
    }
}
