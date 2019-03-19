import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {UserTherapyModule} from './user-therapy/user-therapy.module';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StorageService} from './service/storage.service';
import {RegisterComponent} from './register/register.component';
import {LocationService} from './service/geo-location/location.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastService} from './service/messaging/toast.service';
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
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        UserTherapyModule,
        ToastrModule.forRoot(),
    ],
    providers: [StorageService, LocationService, ToastService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
