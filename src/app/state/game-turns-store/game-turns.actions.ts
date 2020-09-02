import { Action } from '@ngrx/store';
import { GameCardDto } from '@store/game-cards-store/game-cards.models';
import { GamePawnDto } from '@store/games-state/games.models';
import { GenericMoveDto } from './game-turns.models';

export const keezGameTurnsActions = {
    reset: '[gameTurns] getList',

    selectCard: '[gameTurns] selectCard',
    selectAceAction: '[gameTurns] selectAceAction',
    selectPawn: '[gameTurns] selectPawn',
    selectAction: '[gameTurns] selectAction',
    selectSteps: '[gameTurns] selectSteps',
    selectPass: '[gameTurns] selectPass',

    makeMove: '[gameTurns] makeMove',
    makeMoveSucceeded: '[gameTurns] makeMoveSucceeded',
    makeMoveFailed: '[gameTurns] makeMoveFailed'
};

export class GameTurnsReset implements Action {
    readonly type = keezGameTurnsActions.reset;
    constructor() {}
}

export class GameTurnsSelectCard implements Action {
    readonly type = keezGameTurnsActions.selectCard;
    constructor(public card: GameCardDto) {}
}

export class GameTurnsAcePlayed implements Action {
    readonly type = keezGameTurnsActions.selectAceAction;
    constructor(public bringIntoPlay: boolean) {}
}

export class GameTurnsSelectPawn implements Action {
    readonly type = keezGameTurnsActions.selectPawn;
    constructor(public pawn: GamePawnDto) {}
}
export class GameTurnsSetAmountOfStepsFirstPawn implements Action {
    readonly type = keezGameTurnsActions.selectSteps;
    constructor(public steps: number) {}
}

export class GameTurnsSelectPass implements Action {
    readonly type = keezGameTurnsActions.selectPass;
    constructor() {}
}

export class GameTurnsMakeMove implements Action {
    readonly type = keezGameTurnsActions.makeMove;
    constructor(public dto: GenericMoveDto) {}
}

export class GameTurnsMakeMoveSucceeded implements Action {
    readonly type = keezGameTurnsActions.makeMoveSucceeded;
    constructor() {}
}
