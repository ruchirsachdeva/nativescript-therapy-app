import {Routes} from '@angular/router';

import {TherapiesComponent} from './therapies/therapies.component';
import {TestSessionsComponent} from './test-sessions/test-sessions.component';
import {UserService} from './user.service';
import {BookSessionComponent} from './book-session/book-session.component';
import {ProfileComponent} from "~/app/profile/profile.component";
import {MapComponent} from "~/app/map/map.component";
import {JoinSessionComponent} from "~/app/user-therapy/join-session/join-session.component";

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
    {path: 'map', component: MapComponent},
    {path: 'joinsession', component: JoinSessionComponent},

];
