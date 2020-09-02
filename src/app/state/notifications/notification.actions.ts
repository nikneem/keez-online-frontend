import { Action } from '@ngrx/store';
import { NotificationDto } from './notification.models';

export const keezNotificationsActions = {
    show: '[notifications] show'
};

export class ShowNotification implements Action {
    readonly type = keezNotificationsActions.show;
    constructor(public dto: NotificationDto) {}
}
