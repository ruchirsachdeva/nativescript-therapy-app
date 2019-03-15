import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {JsonHttpService} from './json-http.service';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Organization} from '../user-therapy/model';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: JsonHttpService, private storage: StorageService, private router: Router) {
    }


    authenticate(credentials, successCallback, errorCallback) {
        this.http.post(`${environment.server}/api/auth`, JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })).subscribe(response => {
                console.log('auth response.....');
                console.log(response['token']);
                localStorage.setItem('jwt', response['token']);
                return successCallback && successCallback();
            },
            error => {
                return errorCallback && errorCallback();
            });

    }

    create(form, callback) {
        this.http.post(`${environment.server}/api/auth/create`, JSON.stringify(form)).subscribe(response => {
            console.log('auth response.....');
            console.log(response['token']);
            localStorage.setItem('jwt', response['token']);
            return callback && callback();
        });

    }


    getOrganizations(): Observable<Organization[]> {
        return this.http.get<Organization[]>(`${environment.server}/organizations/search/findDistinctBy`)
            .map((data: any) => {
                return data._embedded.organizations;
            });
    }


    isAuthenticated(): boolean {
        return this.storage.getItem('jwt') && true;
    }

    checkAuthentication() {
        if (this.isAuthenticated()) {
            this.router.navigate(['authenticated']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    logout() {
        this.storage.clear();
        this.router.navigate(['/login']);
    }

}
