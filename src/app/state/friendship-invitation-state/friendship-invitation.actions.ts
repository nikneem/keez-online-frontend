import { Action } from '@ngrx/store';
import { FriendshipInvitationRequestDto } from './friendship-invitation.models';

export const keezFriendsInvitationsActions = {
    send: '[friend-invitation] send',
    sendCompleted: '[friend-invitation] sendCompleted',
    sendFailed: '[friend-invitation] sendFailed'
};

export class FriendsInvitationsSend implements Action {
    readonly type = keezFriendsInvitationsActions.send;
    constructor(public dto: FriendshipInvitationRequestDto) {}
}
export class FriendsInvitationsSendCompleted implements Action {
    readonly type = keezFriendsInvitationsActions.sendCompleted;
    constructor() {}
}
export class FriendsInvitationsSendFailed implements Action {
    readonly type = keezFriendsInvitationsActions.sendFailed;
    constructor(public errorMessage: string) {}
}
