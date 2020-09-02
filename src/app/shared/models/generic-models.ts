export class ConfirmationDto {
    public title: string;
    public text: string;
    public showCancel: boolean;

    constructor(init?: Partial<ConfirmationDto>) {
        Object.assign(this, init);
    }
}
