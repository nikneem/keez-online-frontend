import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterNewUserComponent } from 'src/app/shared/components/register-new-user/register-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth.service';
import {
    GoogleUserProfileDto,
    Auth0UserProfileDto
} from 'src/app/shared/models/user-profile';
import { UserProfileDto } from '@store/user-state/user.models';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { UserFromIdentityProvider } from '@store/user-state/user.actions';
import { MessageService } from 'primeng/api';
import { SignalrService } from '@services/signalr.service';
import { NotificationDto } from '@store/notifications/notification.models';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'keez-keez-template',
    templateUrl: './keez-template.component.html',
    styleUrls: ['./keez-template.component.scss']
})
export class KeezTemplateComponent implements OnInit, OnDestroy {
    private profileSubscription: Subscription;
    private userProfileIsLoadingSubscription: Subscription;
    private userProfileSubscription: Subscription;
    private notificationsSubscription: Subscription;

    private userProfile: UserProfileDto;
    isLoading: boolean;
    private userIsNew: boolean;

    constructor(
        private auth: AuthService,
        private store: Store<AppState>,
        private messageService: MessageService,
        private signalRService: SignalrService,
        private translateService: TranslateService
    ) {}

    getUserProfileFromAuthService() {
        this.profileSubscription = this.auth.userProfile$.subscribe(
            (profile) => {
                if (profile.sub && profile.sub.indexOf('google') >= 0) {
                    const googleProfile = new GoogleUserProfileDto(profile);
                    this.userProfile = new UserProfileDto({
                        subject: googleProfile.sub,
                        emailAddress: googleProfile.email,
                        isEmailAddressChecked: googleProfile.email_verified,
                        name: googleProfile.name,
                        picture: googleProfile.picture
                    });
                    this.store.dispatch(
                        new UserFromIdentityProvider(this.userProfile)
                    );
                }
                if (profile.sub && profile.sub.indexOf('auth0') >= 0) {
                    const auth0Profile = new Auth0UserProfileDto(profile);
                    this.userProfile = new UserProfileDto({
                        subject: auth0Profile.sub,
                        emailAddress: auth0Profile.email,
                        isEmailAddressChecked: auth0Profile.email_verified,
                        name: auth0Profile.name,
                        picture: auth0Profile.picture
                    });
                    this.store.dispatch(
                        new UserFromIdentityProvider(this.userProfile)
                    );
                }
            }
        );
    }
    showNotificationMessage(message: NotificationDto) {
        this.translateService
            .get([message.summary, message.detail], message.parameters)
            .subscribe((result) => {
                const messageTitle = result[message.summary];
                const messageText = result[message.detail];
                this.messageService.add({
                    severity: message.severity,
                    summary: messageTitle,
                    detail: messageText,
                    life: 4500
                });
            });
    }
    ngOnInit(): void {
        const self = this;
        this.notificationsSubscription = this.store
            .select((str) => str.notificationsState.lastReceived)
            .subscribe((val) => {
                if (val) {
                    this.showNotificationMessage(val);
                }
            });
        this.userProfileIsLoadingSubscription = this.store
            .select((x) => x.userState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.userProfileSubscription = this.store
            .select((x) => x.userState.userProfile)
            .subscribe((val) => {
                if (val) {
                    this.userProfile = val;
                    if (val.id) {
                        this.signalRService.createConnection(val.id);
                    }
                } else {
                    this.getUserProfileFromAuthService();
                }
            });
    }
    ngOnDestroy(): void {
        if (this.profileSubscription) {
            this.profileSubscription.unsubscribe();
        }
        this.userProfileIsLoadingSubscription.unsubscribe();
        this.userProfileSubscription.unsubscribe();
        this.notificationsSubscription.unsubscribe();
        this.signalRService.disconnect();
    }
}
