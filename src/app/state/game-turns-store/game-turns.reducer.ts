import {
    keezGameTurnsActions,
    GameTurnsSelectPawn,
    GameTurnsSelectCard,
    GameTurnsAcePlayed,
    GameTurnsSetAmountOfStepsFirstPawn
} from './game-turns.actions';
import { GameTurnsState } from './game-turns.state';

export function KeezGameTurnsReducer(state: GameTurnsState, action: any) {
    {
        switch (action.type) {
            case keezGameTurnsActions.reset:
                return {
                    ...state,
                    isLoading: false,
                    errorMessage: null,
                    selectedCard: null,
                    selectedPawnId: null,
                    selectedSecondPawnId: null,
                    requestSecondPawn: false,
                    requestNumberOfSteps: false,
                    isReadyToPlay: false,
                    actionDescription: 'GamesPage.Turns.ActionSelectFirstCard'
                };
            case keezGameTurnsActions.selectCard:
                return selectCardHandler(state, action);
            case keezGameTurnsActions.selectAceAction:
                return selectAceActionhandler(state, action);
            case keezGameTurnsActions.selectPawn:
                return selectPawnHandler(state, action);
            case keezGameTurnsActions.selectSteps:
                return selectStepsHandler(state, action);
            case keezGameTurnsActions.selectPass:
                return selectStepsHandler(state, action);

            case keezGameTurnsActions.makeMove:
                return {
                    ...state,
                    isLoading: true,
                    errorMessage: null
                };

            default:
                return state;
        }
    }
}

function selectCardHandler(
    state: GameTurnsState,
    action: GameTurnsSelectCard
): GameTurnsState {
    const copyState: GameTurnsState = Object.assign({}, state);

    let newDescription =
        action.card.valueInt == 13
            ? 'GamesPage.Turns.ActionSelectSendAction'
            : 'GamesPage.Turns.ActionSelectFirstPawn';

    // Only exception is Ace, in which case the a user action is required
    if (action.card.valueInt == 1) {
        newDescription = null;
    }

    copyState.isLoading = false;
    copyState.requestAdvanceOrBringInPlay = action.card.valueInt == 1;
    copyState.isReadyToPlay = action.card.valueInt == 13;
    copyState.actionDescription = newDescription;
    copyState.requestNumberOfSteps = false;
    copyState.requestSecondPawn = false;
    copyState.selectedCard = action.card;
    copyState.selectedPawnId = null;
    copyState.selectedSecondPawnId = null;
    copyState.errorMessage = null;

    return copyState;
}

function selectAceActionhandler(
    state: GameTurnsState,
    action: GameTurnsAcePlayed
): GameTurnsState {
    const copyState: GameTurnsState = Object.assign({}, state);

    let newDescription = action.bringIntoPlay
        ? 'GamesPage.Turns.ActionSelectSendAction'
        : 'GamesPage.Turns.ActionSelectFirstPawn';

    copyState.requestAdvanceOrBringInPlay = false;
    copyState.isReadyToPlay = action.bringIntoPlay;
    copyState.actionDescription = newDescription;
    copyState.requestNumberOfSteps = false;
    copyState.requestSecondPawn = false;
    copyState.selectedPawnId = null;
    copyState.selectedSecondPawnId = null;
    copyState.errorMessage = null;

    return copyState;
}

function selectPawnHandler(
    state: GameTurnsState,
    action: GameTurnsSelectPawn
): GameTurnsState {
    const copyState: GameTurnsState = Object.assign({}, state);

    if (copyState.selectedCard) {
        if (!copyState.selectedPawnId) {
            copyState.selectedPawnId = action.pawn;
            copyState.isReadyToPlay =
                copyState.selectedCard.valueInt <= 6 ||
                (copyState.selectedCard.valueInt >= 8 &&
                    copyState.selectedCard.valueInt <= 10) ||
                copyState.selectedCard.valueInt == 12;

            if (copyState.isReadyToPlay) {
                copyState.actionDescription =
                    'GamesPage.Turns.ActionSelectSendAction';
            }
            if (copyState.selectedCard.valueInt == 7) {
                copyState.requestNumberOfSteps = true;
                copyState.actionDescription =
                    'GamesPage.Turns.ActionSelectSteps';
            }
            if (copyState.selectedCard.valueInt == 11) {
                copyState.requestSecondPawn = true;
                copyState.actionDescription =
                    'GamesPage.Turns.ActionSelectSecondPawn';
            }
        } else {
            if (copyState.requestSecondPawn) {
                copyState.selectedSecondPawnId = action.pawn;
                copyState.actionDescription =
                    'GamesPage.Turns.ActionSelectSendAction';
                copyState.requestSecondPawn = false;
                copyState.isReadyToPlay = true;
            }
        }
    } else {
        copyState.errorMessage = 'GamesPage.Turns.SelectCardFirst';
    }

    return copyState;
}

function selectStepsHandler(
    state: GameTurnsState,
    action: GameTurnsSetAmountOfStepsFirstPawn
): GameTurnsState {
    const copyState: GameTurnsState = Object.assign({}, state);

    let selectSecondPawn = action.steps < copyState.selectedCard.valueInt;
    let newDescription = selectSecondPawn
        ? 'GamesPage.Turns.ActionSelectSecondPawn'
        : 'GamesPage.Turns.ActionSelectSendAction';

    copyState.requestAdvanceOrBringInPlay = false;
    copyState.isReadyToPlay = !selectSecondPawn;
    copyState.actionDescription = newDescription;
    copyState.requestNumberOfSteps = false;
    copyState.requestSecondPawn = selectSecondPawn;
    copyState.selectedSecondPawnId = null;
    copyState.errorMessage = null;

    return copyState;
}
