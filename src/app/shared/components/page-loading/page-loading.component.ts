import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'keez-page-loading',
    templateUrl: './page-loading.component.html'
})
export class PageLoadingComponent implements OnInit {
    constructor() {}

    @Input()
    public loading: boolean;

    ngOnInit(): void {}
}
