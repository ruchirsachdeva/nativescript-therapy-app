import {Injectable} from '@angular/core';
import {Player, Therapy} from './player';
import {TestSession} from './test-session';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {StorageService} from '../service/storage.service';
import {JsonHttpService} from '../service/json-http.service';
import {environment} from '../../environments/environment';

@Injectable()
export class PlayerService {

    constructor(private storage: StorageService, private http: JsonHttpService) {
    }

    getPlayer(id: number): Observable<Player> {
        return this.http.get<Player>(`${environment.server}/users/` + id);
    }

    getMe(): Observable<Player> {
        return this.http.get<Player>(`${environment.server}/api/users/me`);
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


    getPlayers(): Observable<Player[]> {

        return this.http.get<Player[]>(`${environment.server}/users`)
            .map((data: any) => {
                return data._embedded.users;
            });
    }

    getTherapies(): Observable<Therapy[]> {

        return this.http.get<Therapy[]>(`${environment.server}/api/users/therapies`);
    }


}
