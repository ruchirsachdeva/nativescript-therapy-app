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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        UserTherapyModule,
    ],
    providers: [StorageService, LocationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
