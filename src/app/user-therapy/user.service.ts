import {Injectable} from '@angular/core';
import {User, Therapy, Duration} from './model';
import {TestSession} from './model';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

import {StorageService} from '../service/storage.service';
import {JsonHttpService} from '../service/json-http.service';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(private storage: StorageService, private http: JsonHttpService) {
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${environment.server}/api/users/me`);
    }

    getRequestedSessions(id: number): Observable<TestSession[]> {
        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byTherapyIdRequested?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }


    getOngoingSessions(id: number): Observable<TestSession[]> {
        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byTherapyIdUpcoming?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }

    getHistoricalSessions(id: number): Observable<TestSession[]> {
        return this.http.get<TestSession[]>(`${environment.server}/testSessions/search/byTherapyIdHistory?id=` + id)
            .map((data: any) => {
                return data._embedded.testSessions;
            });
    }


    getOngoingTherapiesForPatient(patient: string): Observable<Therapy[]> {
        return this.http.get<Therapy[]>(`${environment.server}/therapies/search/byPatientOngoing?patient=` + patient)
            .map((data: any) => {
                return data._embedded.therapies;
            });
    }

    getHistoricalTherapiesForPatient(patient: string): Observable<Therapy[]> {
        return this.http.get<Therapy[]>(`${environment.server}/therapies/search/byPatientHistory?patient=` + patient)
            .map((data: any) => {
                return data._embedded.therapies;
            });
    }

    getOngoingTherapiesForMed(med: string): Observable<Therapy[]> {
        return this.http.get<Therapy[]>(`${environment.server}/therapies/search/byMedOngoing?med=` + med)
            .map((data: any) => {
                return data._embedded.therapies;
            });
    }

    getHistoricalTherapiesForMed(med: string): Observable<Therapy[]> {
        return this.http.get<Therapy[]>(`${environment.server}/therapies/search/byMedHistory?med=` + med)
            .map((data: any) => {
                return data._embedded.therapies;
            });
    }


    getAvailableHours(id: number): Observable<Duration[]> {
        return this.http.get<Duration[]>(`${environment.server}/api/users/hours/` + id);
    }

    getSession(id: number): Observable<TestSession> {
        return this.http.get<TestSession>(`${environment.server}/testSessions/` + id);
    }


    requestSession(therapyId: number, requestHours: any): Observable<any> {
        console.log('requesting' + therapyId + '/' + requestHours);
        return this.http.post(`${environment.server}/api/sessions/request/` + therapyId + '/' + requestHours, null);

    }

    bookSession(sessionId: number, from: string, to: string): Observable<any> {
        const duration: Duration = {
            startTime: from,
            endTime: to
        };
        return this.http.post(`${environment.server}/api/sessions/book/` + sessionId, duration);
    }


}
