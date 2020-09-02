import { Action } from '@ngrx/store';
import { UserProfileDto } from './user.models';

export const keezUsersActions = {
    userFromIdentityProvider: '[user] fromIdentityProvider',

    userResolveComplete: '[user] resolveComplete',
    userResolveFailed: '[user] resolveFailed',

    getProfile: '[user] getProfile',
    getProfileComplete: '[user] getProfileComplete',

    updateProfile: '[user] updateProfile',
    updateProfileComplete: '[user] updateProfileComplete',

    userProfileFailed: '[user] userProfileFailed'
};

export class UserFromIdentityProvider implements Action {
    readonly type = keezUsersActions.userFromIdentityProvider;
    constructor(public dto: UserProfileDto) {}
}

export class UserResolveComplete implements Action {
    readonly type = keezUsersActions.userResolveComplete;
    constructor(public dto: UserProfileDto, public isNewUser: boolean) {}
}
export class UserResolveFailed implements Action {
    readonly type = keezUsersActions.userResolveFailed;
    constructor(public errorMessage: string) {}
}

export class GetUserProfile implements Action {
    readonly type = keezUsersActions.getProfile;
    constructor() {}
}
export class GetUserProfileComplete implements Action {
    readonly type = keezUsersActions.getProfileComplete;
    constructor(public dto: UserProfileDto) {}
}

export class UpdateUserProfile implements Action {
    readonly type = keezUsersActions.updateProfile;
    constructor(public dto: UserProfileDto) {}
}
export class UpdateUserProfileComplete implements Action {
    readonly type = keezUsersActions.updateProfileComplete;
    constructor(public dto: UserProfileDto) {}
}

export class UserProfileFailed implements Action {
    readonly type = keezUsersActions.userProfileFailed;
    constructor(public errorMessage: string) {}
}
