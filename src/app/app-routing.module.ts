import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { CallbackPageComponent } from './pages/home/callback-page/callback-page.component';
import { WelcomePageComponent } from './pages/home/welcome-page/welcome-page.component';
import { ServerErrorPageComponent } from '@pages/home/server-error-page/server-error-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'server-down', component: ServerErrorPageComponent },
    { path: 'logout', component: WelcomePageComponent },
    { path: 'callback', component: CallbackPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
