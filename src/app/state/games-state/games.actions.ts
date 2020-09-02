import {
    CreateGameDto,
    GameListItemDto,
    BoardPositionDto,
    GamePlayersDto,
    GamePlayerSetReadyDto,
    GamePawnDto,
    GameDetailsDto
} from './games.models';
import { Action } from '@ngrx/store';

export const keezGamesActions = {
    getList: '[games] getList',
    getListComplete: '[games] getListComplete',

    getDetails: '[games] getDetails',
    getDetailsComplete: '[games] getDetailsComplete',

    setCurrentGameId: '[games] setGameId',

    createNew: '[games] createNew',
    createNewComplete: '[games] createNewComplete',

    getBoardPositions: '[games] getBoardPositions',
    getBoardPositionsComplete: '[games] getBoardPositionsComplete',

    getPawnPositions: '[games] getPlayerPawnPositions',
    getPawnPositionsComplete: '[games] getPlayerPawnPositionsComplete',

    gamesError: '[games] gamesError'
};

export class GamesGetList implements Action {
    readonly type = keezGamesActions.getList;
    constructor() {}
}
export class GamesGetListComplete implements Action {
    readonly type = keezGamesActions.getListComplete;
    constructor(public dto: Array<GameListItemDto>) {}
}

export class GamesGetDetails implements Action {
    readonly type = keezGamesActions.getDetails;
    constructor(public id: string) {}
}
export class GamesGetDetailsComplete implements Action {
    readonly type = keezGamesActions.getDetailsComplete;
    constructor(public dto: GameDetailsDto) {}
}

export class GamesSetCurrentGameId implements Action {
    readonly type = keezGamesActions.setCurrentGameId;
    constructor(public id: string) {}
}

export class GamesGetPawnPositions implements Action {
    readonly type = keezGamesActions.getPawnPositions;
    constructor(public gameId: string) {}
}
export class GamesGetPawnPositionsComplete implements Action {
    readonly type = keezGamesActions.getPawnPositionsComplete;
    constructor(public dto: Array<GamePawnDto>) {}
}

export class GamesCreateNew implements Action {
    readonly type = keezGamesActions.createNew;
    constructor(public dto: CreateGameDto) {}
}
export class GamesCreateNewComplete implements Action {
    readonly type = keezGamesActions.createNewComplete;
    constructor(public dto: GameListItemDto) {}
}

export class GamesGetBoardPositions implements Action {
    readonly type = keezGamesActions.getBoardPositions;
    constructor() {}
}
export class GamesGetBoardPositionsComplete implements Action {
    readonly type = keezGamesActions.getBoardPositionsComplete;
    constructor(public dto: Array<BoardPositionDto>) {}
}

export class GenericGamesFailed implements Action {
    readonly type = keezGamesActions.gamesError;
    constructor(public errorMessage: string) {}
}
