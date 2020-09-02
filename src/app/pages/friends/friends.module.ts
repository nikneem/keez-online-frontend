import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsListPageComponent } from './friends-list-page/friends-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FriendsInvitesPageComponent } from './friends-invites-page/friends-invites-page.component';
import { FriendsNavtabsComponent } from './friends-navtabs/friends-navtabs.component';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { KeezFriendshipEffects } from '@store/friendship-state/friendship.effects';

@NgModule({
    declarations: [
        FriendsListPageComponent,
        FriendsInvitesPageComponent,
        FriendsNavtabsComponent
    ],
    imports: [
        CommonModule,
        FriendsRoutingModule,
        SharedModule,
        TranslateModule,
        EffectsModule.forFeature([KeezFriendshipEffects])
    ]
})
export class FriendsModule {}
