import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    {
      path: 'authenticated',
      redirectTo: '/players',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
    { path: "register", component: RegisterComponent },
];
