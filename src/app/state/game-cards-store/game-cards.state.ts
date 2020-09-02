import { GameCardDto } from './game-cards.models';

export interface GameCardsState {
    isLoading: boolean;
    errorMessage: string;

    cards?: Array<GameCardDto>;
}

export const INITIAL_GAME_CARDS_STATE: GameCardsState = {
    isLoading: false,
    errorMessage: null
};
