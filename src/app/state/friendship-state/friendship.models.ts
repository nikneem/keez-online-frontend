export class FriendshipDto {
    public id: string;
    public name: string;

    constructor(init?: Partial<FriendshipDto>) {
        return Object.assign(this, init);
    }
}

export class FriendshipListDto {
    public id: string;
    public friendId: string;
    public name: string;

    constructor(init?: Partial<FriendshipListDto>) {
        return Object.assign(this, init);
    }
}

export class PendingFriendshipInvitationDto {
    public id: string;
    public name: string;
    public expiresOn: Date;

    constructor(init?: Partial<PendingFriendshipInvitationDto>) {
        return Object.assign(this, init);
    }
}

export class FriendshipRequestApprovalDto {
    public id: string;
    public isApproved: boolean;

    constructor(init?: Partial<FriendshipRequestApprovalDto>) {
        return Object.assign(this, init);
    }
}
