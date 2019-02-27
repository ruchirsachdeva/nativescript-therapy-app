import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BarcelonaModule } from './barcelona/barcelona.module';
import { LoginComponent } from './login/login.component';
import { StorageService } from './service/storage.service';
import * as mobileStorage from 'nativescript-localstorage';


// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
 import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    BarcelonaModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule
  ],
  providers: [
   {
      provide: StorageService,
      useValue: mobileStorage 
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
