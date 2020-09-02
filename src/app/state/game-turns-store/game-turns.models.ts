export class GenericMoveDto {
    public gameId: string;
    public playerId: string;
    public selectedCardId: string;
    public selectedPawnId?: string;
    public selectedSecondPawnId?: string;
    public stepsWithFirstPawn?: number;

    public constructor(init?: Partial<GenericMoveDto>) {
        return Object.assign(this, init);
    }
}
