import { NotificationDto } from './notification.models';

export interface NotificationsState {
    lastReceived: NotificationDto;
}

export const INITIAL_NOTIFICATIONS_STATE: NotificationsState = {
    lastReceived: null
};
