import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'keez-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
    constructor(private auth: AuthService, private router: Router) {}

    private isAuthenticatedSubscription: Subscription;

    login() {
        this.auth.login();
    }

    ngOnInit(): void {
        this.isAuthenticatedSubscription = this.auth.isAuthenticated$.subscribe(
            (val) => {
                if (val) {
                    this.router.navigate(['keez/dashboard']);
                } else {
                    this.router.navigate(['welcome']);
                }
            }
        );
    }
    ngOnDestroy(): void {
        this.isAuthenticatedSubscription.unsubscribe();
    }
}
