import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GameTurnsAcePlayed } from '@store/game-turns-store/game-turns.actions';

export interface DialogData {
    requestWalkOrBringIntoPlay: boolean;
    requestAmountOfSteps: boolean;
}

@Component({
    selector: 'keez-game-control-move-dialog',
    templateUrl: './game-control-move-dialog.component.html',
    styleUrls: ['./game-control-move-dialog.component.scss']
})
export class GameControlMoveDialogComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<GameControlMoveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private store: Store<AppState>
    ) {}

    bringIntoPlayClick() {
        this.store.dispatch(new GameTurnsAcePlayed(true));
        this.dialogRef.close();
    }

    advancePawnClick() {
        this.store.dispatch(new GameTurnsAcePlayed(false));
        this.dialogRef.close();
    }

    ngOnInit(): void {}
}
