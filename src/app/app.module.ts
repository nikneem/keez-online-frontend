import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    HttpClientModule,
    HttpClient,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './pages/home/home.module';
import { KeezModule } from './pages/keez/keez.module';
import { FriendsModule } from '@pages/friends/friends.module';
import { BackendHttpInterceptor } from './shared/http-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import { reducers, INITIAL_APPSTATE } from '@store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { KeezUserEffects } from '@store/user-state/user.effects';
import { KeezFriendshipInvitationEffects } from '@store/friendship-invitation-state/friendship-invitation.effects';
import { GamesModule } from '@pages/games/games.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

let metaReducers = [];
let extModules = [];

if (environment.production === false) {
    metaReducers = [storeFreeze];
    extModules = [
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ];
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HomeModule,
        KeezModule,
        GamesModule,
        FriendsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot(reducers, {
            metaReducers: metaReducers,
            initialState: INITIAL_APPSTATE
        }),
        extModules,
        EffectsModule.forRoot([
            KeezUserEffects,
            KeezFriendshipInvitationEffects
        ])
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendHttpInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
