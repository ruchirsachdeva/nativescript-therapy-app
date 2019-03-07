import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StorageService} from './storage.service';
import {HttpHeaders} from '@angular/common/http';
import {JsonHttpService} from './json-http.service';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';


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
        this.storage.removeItem('jwt');
        this.router.navigate(['/login']);
    }


    media(file: { data: any; status: string }) {

        const req = {
            b64content: file.data
        };

        console.log('posting');
        this.http.post<TwitterResponse>('https://twitter-media-app.herokuapp.com/api/twitter/media', req).subscribe(response => {
            console.log('response = ' + response);
        });
    }

}

export interface TwitterResponse {
    data: any;
    resp: any;
}
