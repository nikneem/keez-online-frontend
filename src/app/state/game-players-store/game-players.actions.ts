import { Action } from '@ngrx/store';
import {
    GamePlayersDto,
    GamePlayerSetReadyDto
} from '@store/games-state/games.models';

export const keezGamePlayersActions = {
    getList: '[gamePlayers] getList',
    getListComplete: '[gamePlayers] getListComplete',

    setReady: '[gamePlayers] setReady',
    setReadyComplete: '[gamePlayers] setReadyComplete'
};

export class GamePlayersGetList implements Action {
    readonly type = keezGamePlayersActions.getList;
    constructor(public gameId: string) {}
}
export class GamePlayersGetListComplete implements Action {
    readonly type = keezGamePlayersActions.getListComplete;
    constructor(public dto: GamePlayersDto) {}
}

export class GamePlayersSetReady implements Action {
    readonly type = keezGamePlayersActions.setReady;
    constructor(public dto: GamePlayerSetReadyDto) {}
}
export class GamePlayersSetReadyComplete implements Action {
    readonly type = keezGamePlayersActions.setReadyComplete;
    constructor() {}
}
