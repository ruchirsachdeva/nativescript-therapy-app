import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {UserTherapyModule} from './user-therapy/user-therapy.module';
import {LoginComponent} from './login/login.component';
import {StorageService} from './service/storage.service';
import * as mobileStorage from 'nativescript-localstorage';


// Uncomment and add to NgModule imports if you need to use two-way binding
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {RegisterComponent} from './register/register.component';
import {LocationService} from './service/geo-location/location.service.tns';
import {ToastService} from './service/messaging/toast.service.tns';
import {DropDownModule} from 'nativescript-drop-down/angular';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        UserTherapyModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        DropDownModule
    ],
    providers: [
        {
            provide: StorageService,
            useValue: mobileStorage
        },
        LocationService,
        ToastService,
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
