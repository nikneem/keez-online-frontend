export class UserProfileDto {
    public id: string;
    public subject: string;
    public name: string;
    public emailAddress: string;
    public isEmailAddressChecked: boolean;
    public picture: string;
    public friendshipId: string;

    constructor(init?: Partial<UserProfileDto>) {
        return Object.assign(this, init);
    }
}
