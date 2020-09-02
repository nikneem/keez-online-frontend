import { FriendshipInvitationState } from './friendship-invitation.state';
import { keezFriendsInvitationsActions } from './friendship-invitation.actions';

export function KeezFriendshipInvitationReducer(
    state: FriendshipInvitationState,
    action: any
) {
    {
        switch (action.type) {
            case keezFriendsInvitationsActions.send:
                return {
                    ...state,
                    friendshipInvitation: action.dto,
                    errorMessage: null,
                    isLoading: true
                };
            case keezFriendsInvitationsActions.sendCompleted:
                return {
                    ...state,
                    friendshipInvitation: null,
                    errorMessage: null,
                    isLoading: false
                };
            case keezFriendsInvitationsActions.sendFailed:
                return {
                    ...state,
                    errorMessage: action.errorMessage,
                    isLoading: false
                };

            default:
                return state;
        }
    }
}
