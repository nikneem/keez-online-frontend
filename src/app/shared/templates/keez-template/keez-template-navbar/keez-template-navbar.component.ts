import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserProfileDto } from '@store/user-state/user.models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { RegisterNewUserComponent } from 'src/app/shared/components/register-new-user/register-new-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'keez-template-navbar',
    templateUrl: './keez-template-navbar.component.html',
    styleUrls: ['./keez-template-navbar.component.scss']
})
export class KeezTemplateNavbarComponent implements OnInit, OnDestroy {
    userProfile: UserProfileDto;
    isLoading: boolean;

    private userProfileSubscription: Subscription;
    private userProfileIsLoadingSubscription: Subscription;
    private userProfileIsNewSubscription: Subscription;

    constructor(
        private auth: AuthService,
        private dialog: MatDialog,
        private store: Store<AppState>
    ) {}

    showUserRegistration() {
        let dialogRef = this.dialog.open(RegisterNewUserComponent, {
            width: '600px',
            closeOnNavigation: false,
            disableClose: true
        });
    }

    logout() {
        this.auth.logout();
    }

    ngOnInit(): void {
        this.userProfileSubscription = this.store
            .select((str) => str.userState.userProfile)
            .subscribe((val) => (this.userProfile = val));
        this.userProfileIsLoadingSubscription = this.store
            .select((str) => str.userState.isLoading)
            .subscribe((val) => (this.isLoading = val));
        this.userProfileIsNewSubscription = this.store
            .select((x) => x.userState.isNewUser)
            .subscribe((val) => {
                if (val) {
                    this.showUserRegistration();
                }
            });
    }
    ngOnDestroy() {
        this.userProfileSubscription.unsubscribe();
        this.userProfileIsLoadingSubscription.unsubscribe();
        this.userProfileIsNewSubscription.unsubscribe();
    }
}
