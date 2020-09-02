import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'keez-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
    constructor() {}
    @Input()
    public message: boolean;

    ngOnInit(): void {}
}
