import { GameCardDto } from '@store/game-cards-store/game-cards.models';
import { GamePawnDto } from '@store/games-state/games.models';

export interface GameTurnsState {
    isLoading: boolean;
    errorMessage: string;

    actionDescription: string;

    selectedCard?: GameCardDto;
    selectedPawnId?: GamePawnDto;
    selectedSecondPawnId?: GamePawnDto;

    requestAdvanceOrBringInPlay: boolean;
    requestSecondPawn: boolean;
    requestNumberOfSteps: boolean;

    selectedNumberOfSteps?: number;

    isReadyToPlay: boolean;
}

export const INITIAL_GAME_TURNS_STATE: GameTurnsState = {
    isLoading: true,
    errorMessage: null,
    requestAdvanceOrBringInPlay: false,
    requestSecondPawn: false,
    requestNumberOfSteps: false,
    isReadyToPlay: false,
    actionDescription: 'GamesPage.Turns.ActionSelectFirstCard'
};
