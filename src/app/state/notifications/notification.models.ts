export class NotificationDto {
    public severity: string;
    public summary: string;
    public detail: string;
    public parameters: string;
    public sentOn: Date;

    constructor(init?: Partial<NotificationDto>) {
        Object.assign(this, init);
    }
}
