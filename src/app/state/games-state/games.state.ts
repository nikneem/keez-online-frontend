import {
    GameListItemDto,
    BoardPositionDto,
    GamePlayersDto,
    GamePawnDto,
    GameDetailsDto
} from './games.models';

export interface GamesState {
    isLoading: boolean;
    errorMessage: string;

    currentGameId?: string;
    currentGame?: GameDetailsDto;
    games?: Array<GameListItemDto>;
    boardPositions?: Array<BoardPositionDto>;
    players?: GamePlayersDto;
    pawns?: Array<GamePawnDto>;
}

export const INITIAL_GAMES_STATE: GamesState = {
    isLoading: false,
    errorMessage: null
};
