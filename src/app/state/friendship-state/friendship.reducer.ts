import { FriendshipState } from './friendship.state';
import {
    keezFriendshipActions,
    ProcessPendingInvitationComplete
} from './friendship.actions';
import { PendingFriendshipInvitationDto } from './friendship.models';

export function KeezFriendshipReducer(state: FriendshipState, action: any) {
    {
        switch (action.type) {
            case keezFriendshipActions.getList:
            case keezFriendshipActions.getPendingInvitations:
                return {
                    ...state,
                    errorMessage: null,
                    isLoading: true
                };
            case keezFriendshipActions.getListComplete:
                return {
                    ...state,
                    friendships: action.dto,
                    errorMessage: null,
                    isLoading: false
                };
            case keezFriendshipActions.getPendingInvitationsComplete:
                return {
                    ...state,
                    pendingInvitations: action.dto,
                    errorMessage: null,
                    isLoading: false
                };
            case keezFriendshipActions.failure:
                return {
                    ...state,
                    pendingInvitations: null,
                    errorMessage: action.errorMessage,
                    isLoading: false
                };

            case keezFriendshipActions.processPendingInvitation:
                return {
                    ...state,
                    errorMessage: null,
                    isLoading: true
                };
            case keezFriendshipActions.processPendingInvitationComplete:
                return dayFixJoinSucceededHandler(state, action);

            default:
                return state;
        }
    }
}

function dayFixJoinSucceededHandler(
    state: FriendshipState,
    action: ProcessPendingInvitationComplete
): FriendshipState {
    const copyState: FriendshipState = Object.assign({}, state);

    const newInvitationsList = new Array<PendingFriendshipInvitationDto>(
        ...copyState.pendingInvitations
    );
    const element = newInvitationsList.find((elm) => elm.id === action.dto.id);
    if (element) {
        const elementIndex = newInvitationsList.indexOf(element);
        newInvitationsList.splice(elementIndex, 1);
    }

    copyState.pendingInvitations = newInvitationsList;
    copyState.isLoading = false;

    return copyState;
}
