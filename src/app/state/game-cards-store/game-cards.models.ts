export class GameCardDto {
    public id: string;
    public suit: string;
    public suitTranslationKey: string;
    public valueTranslationKey: string;
    public valueInt: number;

    constructor(init?: Partial<GameCardDto>) {
        return Object.assign(this, init);
    }
}
