import { UserState } from './user.state';
import { keezUsersActions } from './user.actions';

export function KeezUsersReducer(state: UserState, action: any) {
    {
        switch (action.type) {
            case keezUsersActions.userFromIdentityProvider:
                return {
                    ...state,
                    userProfile: action.dto,
                    errorMessage: null,
                    isLoading: true
                };
            case keezUsersActions.userResolveComplete:
                return {
                    ...state,
                    userProfile: action.dto,
                    isLoading: false,
                    isNewUser: action.isNewUser
                };

            case keezUsersActions.getProfile:
            case keezUsersActions.updateProfile:
                return {
                    ...state,
                    isLoading: true,
                    errorMessage: null
                };

            case keezUsersActions.getProfileComplete:
            case keezUsersActions.updateProfileComplete:
                return {
                    ...state,
                    isLoading: false,
                    userProfile: action.dto,
                    isNewUser: false
                };

            case keezUsersActions.userProfileFailed:
                return {
                    ...state,
                    isLoading: false,
                    errorMessage: action.errorMessage
                };

            default:
                return state;
        }
    }
}
