import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeezTemplateComponent } from './keez-template/keez-template.component';
import { KeezTemplateNavbarComponent } from './keez-template-navbar/keez-template-navbar.component';
import { KeezTemplateMenuComponent } from './keez-template-menu/keez-template-menu.component';
import { SharedModule } from '../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
    declarations: [
        KeezTemplateComponent,
        KeezTemplateNavbarComponent,
        KeezTemplateMenuComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule,
        RouterModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class KeezTemplateModule {}
