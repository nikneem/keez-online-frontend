import { GamePlayersDto } from '@store/games-state/games.models';

export interface GamePlayersState {
    isLoading: boolean;
    errorMessage: string;

    players?: GamePlayersDto;
}

export const INITIAL_GAME_PLAYERS_STATE: GamePlayersState = {
    isLoading: true,
    errorMessage: null
};
