export class GoogleUserProfileDto {
    public given_name: string;
    public family_name: string;
    public nickname: string;
    public name: string;
    public picture: string;
    public email: string;
    public email_verified: boolean;
    public locale: string;
    public sub: string;

    constructor(init?: Partial<GoogleUserProfileDto>) {
        return Object.assign(this, init);
    }
}

export class Auth0UserProfileDto {
    public nickname: string;
    public name: string;
    public picture: string;
    public email: string;
    public email_verified: boolean;
    public locale: string;
    public sub: string;

    constructor(init?: Partial<Auth0UserProfileDto>) {
        return Object.assign(this, init);
    }
}
