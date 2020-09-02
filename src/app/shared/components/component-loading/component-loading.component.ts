import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'keez-component-loading',
    templateUrl: './component-loading.component.html',
    styleUrls: ['./component-loading.component.scss']
})
export class ComponentLoadingComponent implements OnInit {
    @Input() public loading: boolean;

    constructor() {}

    ngOnInit(): void {}
}
