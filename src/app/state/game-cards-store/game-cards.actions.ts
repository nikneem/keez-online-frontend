import { Action } from '@ngrx/store';
import { GameCardDto } from './game-cards.models';

export const keezGameCardsActions = {
    getList: '[gamesCards] getList',
    getListComplete: '[gamesCards] getListComplete',

    error: '[gamesCards] error'
};

export class GameCardsGetList implements Action {
    readonly type = keezGameCardsActions.getList;
    constructor(public gameId: string) {}
}
export class GameCardsGetListComplete implements Action {
    readonly type = keezGameCardsActions.getListComplete;
    constructor(public dto: Array<GameCardDto>) {}
}

export class GameCardsError implements Action {
    readonly type = keezGameCardsActions.error;
    constructor(public errorMessage: string) {}
}
