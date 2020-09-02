import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GameCardDto } from '@store/game-cards-store/game-cards.models';
import { GameControlMoveDialogComponent } from '../game-control-move-dialog/game-control-move-dialog.component';
import {
    GameTurnsAcePlayed,
    GameTurnsSetAmountOfStepsFirstPawn
} from '@store/game-turns-store/game-turns.actions';

@Component({
    selector: 'keez-game-controls',
    templateUrl: './game-controls.component.html',
    styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit, OnDestroy {
    gameId: string;

    private gameIdSubscription: Subscription;

    constructor(private store: Store<AppState>, public dialog: MatDialog) {}

    private checkBringIntoPlayOrWalkInterventionRequired(
        requestWalkOrBringIntoPlay: boolean
    ) {
        // When the player plays an Ace, a decision is required whether
        // the player wants to advance a pawn, or bring a pawn into play.
        // This check raises a dialog forcing the user to make a choise
        if (requestWalkOrBringIntoPlay) {
            let dialogInstance = this.dialog.open(
                GameControlMoveDialogComponent,
                {
                    width: '460px',
                    data: {
                        requestWalkOrBringIntoPlay: requestWalkOrBringIntoPlay
                    }
                }
            );

            dialogInstance.afterClosed().subscribe((result) => {
                this.store.dispatch(new GameTurnsAcePlayed(result));
            });
        }
    }
    private checkAmountOfStepsInterventionRequired(
        requestAmountOfSteps: boolean
    ) {
        // When the player plays an Ace, a decision is required whether
        // the player wants to advance a pawn, or bring a pawn into play.
        // This check raises a dialog forcing the user to make a choise
        if (requestAmountOfSteps) {
            let dialogInstance = this.dialog.open(
                GameControlMoveDialogComponent,
                {
                    width: '460px',
                    data: {
                        requestAmountOfSteps: requestAmountOfSteps
                    }
                }
            );

            dialogInstance.afterClosed().subscribe((result) => {
                this.store.dispatch(
                    new GameTurnsSetAmountOfStepsFirstPawn(result)
                );
            });
        }
    }

    ngOnInit(): void {
        this.gameIdSubscription = this.store
            .select((str) => str.gamesState.currentGameId)
            .subscribe((val) => (this.gameId = val));
        this.gameIdSubscription = this.store
            .select((str) => str.gameTurnsState.requestAdvanceOrBringInPlay)
            .subscribe((val) =>
                this.checkBringIntoPlayOrWalkInterventionRequired(val)
            );
        this.gameIdSubscription = this.store
            .select((str) => str.gameTurnsState.requestNumberOfSteps)
            .subscribe((val) =>
                this.checkAmountOfStepsInterventionRequired(val)
            );
    }
    ngOnDestroy(): void {
        this.gameIdSubscription.unsubscribe();
    }
}
