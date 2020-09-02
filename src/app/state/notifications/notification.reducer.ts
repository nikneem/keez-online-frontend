import { NotificationsState } from './notification.state';
import { keezNotificationsActions } from './notification.actions';
import { Actions } from '@ngrx/effects';

export function KeezNotificationReducer(
    state: NotificationsState,
    action: any
) {
    {
        switch (action.type) {
            case keezNotificationsActions.show:
                return {
                    ...state,
                    lastReceived: action.dto
                };
            default:
                return state;
        }
    }
}
