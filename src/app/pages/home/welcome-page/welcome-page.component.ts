import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'keez-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
    constructor(private auth: AuthService) {}

    login() {
        this.auth.login('/keez/dashboard');
    }

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
