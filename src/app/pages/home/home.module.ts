import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CallbackPageComponent } from './callback-page/callback-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ServerErrorPageComponent } from './server-error-page/server-error-page.component';

@NgModule({
    declarations: [HomePageComponent, CallbackPageComponent, WelcomePageComponent, ServerErrorPageComponent],
    imports: [CommonModule, SharedModule, TranslateModule]
})
export class HomeModule {}
