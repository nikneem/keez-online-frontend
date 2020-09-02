import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'keez-server-error-page',
    templateUrl: './server-error-page.component.html',
    styleUrls: ['./server-error-page.component.scss']
})
export class ServerErrorPageComponent implements OnInit {
    constructor(private router: Router) {}

    goHome() {
        this.router.navigate(['/']);
    }
    ngOnInit(): void {}
}
