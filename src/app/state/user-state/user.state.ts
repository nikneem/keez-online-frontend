import { UserProfileDto } from './user.models';

export interface UserState {
    isLoading: boolean;
    errorMessage: string;

    userProfile: UserProfileDto;
    isNewUser: boolean;
}

export const INITIAL_USER_STATE: UserState = {
    isLoading: false,
    errorMessage: null,

    userProfile: null,
    isNewUser: false
};
