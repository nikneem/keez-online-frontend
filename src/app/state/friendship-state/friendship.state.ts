import {
    PendingFriendshipInvitationDto,
    FriendshipDto,
    FriendshipListDto
} from './friendship.models';

export interface FriendshipState {
    isLoading: boolean;
    errorMessage: string;
    friendships: FriendshipListDto[];
    pendingInvitations: PendingFriendshipInvitationDto[];
}

export const INITIAL_FRIENDSHIP_STATE: FriendshipState = {
    isLoading: false,
    errorMessage: null,
    friendships: null,
    pendingInvitations: null
};
