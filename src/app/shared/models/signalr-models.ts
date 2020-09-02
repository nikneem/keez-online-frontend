export class ConnectionInfoDto {
    public url: string;
    public accessToken: string;

    constructor(init?: Partial<ConnectionInfoDto>) {
        Object.assign(this, init);
    }
}
