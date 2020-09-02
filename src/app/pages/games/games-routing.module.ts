import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeezTemplateComponent } from 'src/app/shared/templates/keez-template/keez-template/keez-template.component';
import { AuthGuard } from 'src/app/auth.guard';
import { GamesListPageComponent } from './games-list-page/games-list-page.component';
import { GameDetailsPageComponent } from './game-details-page/game-details-page.component';

const routes: Routes = [
    {
        path: 'games',
        component: KeezTemplateComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: GamesListPageComponent },
            { path: ':id', component: GameDetailsPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GamesRoutingModule {}
