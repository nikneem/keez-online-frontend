export class CreateGameDto {
    public name: string;
    public playerTwo: string;
    public playerThree: string;
    public playerFour: string;
    public shufflePlayers: boolean;

    constructor(init?: Partial<CreateGameDto>) {
        return Object.assign(this, init);
    }
}

export class GameListItemDto {
    public id: string;
    public name: string;
    public statusId: number;
    public status: string;
    public playerOne: GamePlayerInfoDto;
    public playerTwo: GamePlayerInfoDto;
    public playerThree: GamePlayerInfoDto;
    public playerFour: GamePlayerInfoDto;
    public lastActivityOn: Date;

    constructor(init?: Partial<GameListItemDto>) {
        return Object.assign(this, init);
    }
}

export class GameDetailsDto {
    public id: string;
    public name: string;
    public isStarted: boolean;
    public status: GameStatusDto;
    public playerId: string;
    public playerHasTurn: string;
    public createdOn: Date;
    public lastActivityOn: Date;

    constructor(init?: Partial<GameDetailsDto>) {
        return Object.assign(this, init);
    }
}

export class GameStatusDto {
    public Id: number;
    public TranslationKey: string;

    constructor(init?: Partial<GameStatusDto>) {
        return Object.assign(this, init);
    }
}

export class GamePlayerInfoDto {
    public id: string;
    public sequence: number;
    public name: string;
    public color: string;
    public isReady: boolean;
    public hasTurn: boolean;
    constructor(init?: Partial<GamePlayerInfoDto>) {
        return Object.assign(this, init);
    }
}

export class BoardPositionDto {
    public id: number;
    public coordX: number;
    public coordY: number;
    public boardOrder?: number;
    public borderColor: string;
    public fillColor: string;

    constructor(init?: Partial<BoardPositionDto>) {
        return Object.assign(this, init);
    }
}

export class PlayerDto {
    public id: string;
    public name: string;
    public picture: string;
    public color: string;
    public isReady: boolean;
    public hasTurn: boolean;

    constructor(init?: Partial<PlayerDto>) {
        return Object.assign(this, init);
    }
}
export class GamePlayersDto {
    public gameId: string;
    public gameIsStarted: boolean;
    public players: Array<PlayerDto>;

    constructor(init?: Partial<GamePlayersDto>) {
        return Object.assign(this, init);
    }
}

export class GamePlayerSetReadyDto {
    public gameId: string;
    public playerId: string;
    public isReady = true;

    constructor(init?: Partial<GamePlayerSetReadyDto>) {
        return Object.assign(this, init);
    }
}

export class GamePawnDto {
    public id: string;
    public color: string;
    public coordX: number;
    public coordY: number;
    public isProtected: boolean;
    public isHome: boolean;
    public isFinished: boolean;
    constructor(init?: Partial<GamePawnDto>) {
        return Object.assign(this, init);
    }
}
