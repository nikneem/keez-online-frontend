import { GameCardsState } from './game-cards.state';
import { keezGameCardsActions } from './game-cards.actions';

export function KeezGameCardsReducer(state: GameCardsState, action: any) {
    {
        switch (action.type) {
            case keezGameCardsActions.getList:
                return {
                    ...state,
                    isLoading: true,
                    errorMessage: null
                };

            case keezGameCardsActions.getListComplete:
                return {
                    ...state,
                    isLoading: false,
                    cards: action.dto
                };

            case keezGameCardsActions.error:
                return {
                    ...state,
                    isLoading: false,
                    errorMessage: action.errorMessage
                };

            default:
                return state;
        }
    }
}
