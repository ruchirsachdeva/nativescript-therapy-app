import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {HttpHeaders} from '@angular/common/http';
import {JsonHttpService} from './json-http.service';
import {Router} from '@angular/router';

import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: JsonHttpService, private storage: StorageService, private router: Router) {
    }


    authenticate(credentials, callback) {
        console.log('auth');
        this.http.post(`${environment.server}/api/auth`, JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })).subscribe(response => {
            console.log('auth response.....');
            console.log(response['token']);
            localStorage.setItem('jwt', response['token']);
            return callback && callback();
        });

    }

    create(form, callback) {
        console.log('create');
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

}
