import { keezGamePlayersActions } from './game-players.actions';
import { GamePlayersState } from './game-players.state';

export function KeezGamePlayersReducer(state: GamePlayersState, action: any) {
    {
        switch (action.type) {
            case keezGamePlayersActions.getList:
            case keezGamePlayersActions.setReady:
                return {
                    ...state,
                    isLoading: true,
                    errorMessage: null
                };
            case keezGamePlayersActions.getListComplete:
                return {
                    ...state,
                    isLoading: false,
                    players: action.dto
                };
            default:
                return state;
        }
    }
}
