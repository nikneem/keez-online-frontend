import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeezRoutingModule } from './keez-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { KeezTemplateModule } from 'src/app/shared/templates/keez-template/keez-template.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [DashboardPageComponent],
    imports: [
        CommonModule,
        KeezRoutingModule,
        KeezTemplateModule,
        SharedModule,
        TranslateModule
    ]
})
export class KeezModule {}
