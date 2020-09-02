import { GamesState } from './games.state';
import { keezGamesActions } from './games.actions';

export function KeezGamesReducer(state: GamesState, action: any) {
    {
        switch (action.type) {
            case keezGamesActions.setCurrentGameId:
                return {
                    ...state,
                    currentGameId: action.id
                };
            case keezGamesActions.getList:
            case keezGamesActions.createNew:
            case keezGamesActions.getBoardPositions:
            case keezGamesActions.getDetails:
            case keezGamesActions.getPawnPositions:
                return {
                    ...state,
                    isLoading: true,
                    errorMessage: null
                };

            case keezGamesActions.getListComplete:
                return {
                    ...state,
                    isLoading: false,
                    games: action.dto
                };

            case keezGamesActions.getDetailsComplete:
                return {
                    ...state,
                    isLoading: false,
                    currentGame: action.dto
                };

            case keezGamesActions.getBoardPositionsComplete:
                return {
                    ...state,
                    isLoading: false,
                    boardPositions: action.dto
                };

            case keezGamesActions.getPawnPositionsComplete:
                return {
                    ...state,
                    isLoading: false,
                    pawns: action.dto
                };

            case keezGamesActions.createNewComplete:
                return {
                    ...state,
                    isLoading: false
                };

            case keezGamesActions.gamesError:
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
