export class FriendshipInvitationRequestDto {
    public friendshipId: string;

    constructor(init?: Partial<FriendshipInvitationRequestDto>) {
        return Object.assign(this, init);
    }
}
