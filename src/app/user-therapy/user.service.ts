import {Injectable} from '@angular/core';
import {User, Therapy} from './model';
import {TestSession} from './test-session';
import {Observable} from 'rxjs';

import {StorageService} from '../service/storage.service';
import {JsonHttpService} from '../service/json-http.service';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(private storage: StorageService, private http: JsonHttpService) {
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${environment.server}/users/` + id);
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${environment.server}/api/users/me`);
    }

    getTestSessionsByMedId(id: number): Observable<TestSession[]> {

        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byMedId?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }

    getTestSessionsByPatientId(id: number): Observable<TestSession[]> {
        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byPatientId?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }

    byTherapyId(id: number): Observable<TestSession[]> {
        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byTherapyId?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }


    getUsers(): Observable<User[]> {

        return this.http.get<User[]>(`${environment.server}/users`)
            .map((data: any) => {
                return data._embedded.users;
            });
    }

    getTherapies(): Observable<Therapy[]> {

        return this.http.get<Therapy[]>(`${environment.server}/api/users/therapies`);
    }


}
