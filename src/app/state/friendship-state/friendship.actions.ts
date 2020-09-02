import { Action } from '@ngrx/store';
import {
    PendingFriendshipInvitationDto,
    FriendshipRequestApprovalDto,
    FriendshipDto,
    FriendshipListDto
} from './friendship.models';

export const keezFriendshipActions = {
    getList: '[friendship] getList',
    getListComplete: '[friendship] getListComplete',

    getPendingInvitations: '[friendship] getPendingInvitations',
    getPendingInvitationsComplete: '[friendship] getPendingInvitationsComplete',

    processPendingInvitation: '[friendship] getProcessPendingInvitation',
    processPendingInvitationComplete:
        '[friendship] getProcessPendingInvitationComplete',

    failure: '[friendship] genericFailure'
};

export class GetFriendshipsList implements Action {
    readonly type = keezFriendshipActions.getList;
    constructor() {}
}
export class GetFriendshipsListComplete implements Action {
    readonly type = keezFriendshipActions.getListComplete;
    constructor(public dto: Array<FriendshipListDto>) {}
}

export class GetPendingFriendshipInvitations implements Action {
    readonly type = keezFriendshipActions.getPendingInvitations;
    constructor() {}
}
export class GetPendingFriendshipInvitationsComplete implements Action {
    readonly type = keezFriendshipActions.getPendingInvitationsComplete;
    constructor(public dto: Array<PendingFriendshipInvitationDto>) {}
}

export class ProcessPendingInvitation implements Action {
    readonly type = keezFriendshipActions.processPendingInvitation;
    constructor(public dto: FriendshipRequestApprovalDto) {}
}
export class ProcessPendingInvitationComplete implements Action {
    readonly type = keezFriendshipActions.processPendingInvitationComplete;
    constructor(public dto: FriendshipRequestApprovalDto) {}
}

export class GenericFriendshipFailed implements Action {
    readonly type = keezFriendshipActions.failure;
    constructor(public errorMessage: string) {}
}
