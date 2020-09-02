import { FriendshipInvitationRequestDto } from './friendship-invitation.models';

export interface FriendshipInvitationState {
    isLoading: boolean;
    errorMessage: string;
    friendshipInvitation: FriendshipInvitationRequestDto;
}

export const INITIAL_FRIENDSHIP_INVITATION_STATE: FriendshipInvitationState = {
    isLoading: false,
    errorMessage: null,
    friendshipInvitation: null
};
