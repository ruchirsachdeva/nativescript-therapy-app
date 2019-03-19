import {Routes} from '@angular/router';

import {TherapiesComponent} from './therapies/therapies.component';
import {TestSessionsComponent} from './test-sessions/test-sessions.component';
import {UserService} from './user.service';
import {BookSessionComponent} from './book-session/book-session.component';
import {ProfileComponent} from "~/app/profile/profile.component";

export const componentDeclarations: any[] = [
    TherapiesComponent,
    TestSessionsComponent,
];

export const providerDeclarations: any[] = [
    UserService
];

export const routes: Routes = [
    {path: 'therapies', component: TherapiesComponent},
    {path: 'therapy/:id', component: TestSessionsComponent},
    {path: 'session/:id', component: BookSessionComponent},
    {path: 'profile', component: ProfileComponent},
];
