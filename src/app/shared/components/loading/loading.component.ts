import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'keez-loading',
    templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
    constructor() {}

    @Input()
    public loading: boolean;

    ngOnInit() {}
}
