import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { KeezTemplateComponent } from 'src/app/shared/templates/keez-template/keez-template/keez-template.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
    {
        path: 'keez',
        component: KeezTemplateComponent,
        canActivate: [AuthGuard],
        children: [{ path: 'dashboard', component: DashboardPageComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KeezRoutingModule {}
