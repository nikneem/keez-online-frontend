import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from '@pages/keez/dashboard-page/dashboard-page.component';
import { KeezTemplateComponent } from 'src/app/shared/templates/keez-template/keez-template/keez-template.component';
import { AuthGuard } from 'src/app/auth.guard';
import { FriendsListPageComponent } from './friends-list-page/friends-list-page.component';
import { FriendsInvitesPageComponent } from './friends-invites-page/friends-invites-page.component';

const routes: Routes = [
    {
        path: 'friends',
        component: KeezTemplateComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'list', component: FriendsListPageComponent },
            { path: 'invites', component: FriendsInvitesPageComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FriendsRoutingModule {}
