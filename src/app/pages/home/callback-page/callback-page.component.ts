import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'keez-callback-page',
    templateUrl: './callback-page.component.html',
    styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit(): void {}
}
