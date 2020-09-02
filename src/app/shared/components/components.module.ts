import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { MomentPipe } from './pipes/moment.pipe';
import { ComponentLoadingComponent } from './component-loading/component-loading.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        LoadingComponent,
        PageLoadingComponent,
        RegisterNewUserComponent,
        ErrorMessageComponent,
        InviteFriendComponent,
        MomentPipe,
        ComponentLoadingComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    exports: [
        LoadingComponent,
        PageLoadingComponent,
        ComponentLoadingComponent,
        RegisterNewUserComponent,
        ErrorMessageComponent,
        InviteFriendComponent,
        MomentPipe
    ],
    entryComponents: [
        RegisterNewUserComponent,
        InviteFriendComponent,
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule {}
