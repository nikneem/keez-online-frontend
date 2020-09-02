import { routerReducer } from '@ngrx/router-store';
import { UserState, INITIAL_USER_STATE } from './user-state/user.state';
import { KeezUsersReducer } from './user-state/user.reducer';
import {
    INITIAL_FRIENDSHIP_INVITATION_STATE,
    FriendshipInvitationState
} from './friendship-invitation-state/friendship-invitation.state';
import { KeezFriendshipInvitationReducer } from './friendship-invitation-state/friendship-invitation.reducer';
import {
    FriendshipState,
    INITIAL_FRIENDSHIP_STATE
} from './friendship-state/friendship.state';
import { KeezFriendshipReducer } from './friendship-state/friendship.reducer';
import {
    NotificationsState,
    INITIAL_NOTIFICATIONS_STATE
} from './notifications/notification.state';
import { KeezNotificationReducer } from './notifications/notification.reducer';
import { GamesState, INITIAL_GAMES_STATE } from './games-state/games.state';
import { KeezGamesReducer } from './games-state/games.reducer';
import {
    GameCardsState,
    INITIAL_GAME_CARDS_STATE
} from './game-cards-store/game-cards.state';
import { KeezGameCardsReducer } from './game-cards-store/game-cards.reducer';
import {
    GamePlayersState,
    INITIAL_GAME_PLAYERS_STATE
} from './game-players-store/game-players.state';
import { KeezGamePlayersReducer } from './game-players-store/game-players.reducer';
import {
    GameTurnsState,
    INITIAL_GAME_TURNS_STATE
} from './game-turns-store/game-turns.state';
import { KeezGameTurnsReducer } from './game-turns-store/game-turns.reducer';

export interface AppState {
    userState: UserState;
    friendshipState: FriendshipState;
    friendshipInvistaionsState: FriendshipInvitationState;
    notificationsState: NotificationsState;
    gamesState: GamesState;
    gamePlayersState: GamePlayersState;
    gameCardsState: GameCardsState;
    gameTurnsState: GameTurnsState;
}

export const INITIAL_APPSTATE: AppState = {
    userState: INITIAL_USER_STATE,
    friendshipState: INITIAL_FRIENDSHIP_STATE,
    friendshipInvistaionsState: INITIAL_FRIENDSHIP_INVITATION_STATE,
    notificationsState: INITIAL_NOTIFICATIONS_STATE,
    gamesState: INITIAL_GAMES_STATE,
    gamePlayersState: INITIAL_GAME_PLAYERS_STATE,
    gameCardsState: INITIAL_GAME_CARDS_STATE,
    gameTurnsState: INITIAL_GAME_TURNS_STATE
};

export const reducers = {
    routerReducer: routerReducer,
    userState: KeezUsersReducer,
    friendshipState: KeezFriendshipReducer,
    friendshipInvistaionsState: KeezFriendshipInvitationReducer,
    notificationsState: KeezNotificationReducer,
    gamesState: KeezGamesReducer,
    gamePlayersState: KeezGamePlayersReducer,
    gameCardsState: KeezGameCardsReducer,
    gameTurnsState: KeezGameTurnsReducer
};
