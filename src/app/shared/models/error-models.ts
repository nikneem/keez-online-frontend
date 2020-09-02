export class ErrorCodeDto {
    public errorCode: number;
    public message: string;

    constructor(init?: Partial<ErrorCodeDto>) {
        return Object.assign(this, init);
    }
}
