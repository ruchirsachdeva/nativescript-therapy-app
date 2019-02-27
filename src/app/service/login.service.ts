import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {HttpHeaders} from "@angular/common/http";
import {JsonHttpService} from "./json-http.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: JsonHttpService, private storage: StorageService) {
    }


    authenticate(credentials, callback) {
        console.log('auth');
        this.http.post('https://pd-social-server.herokuapp.com/api/auth', JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })).subscribe(response => {
            console.log('auth response.....');
            console.log(response['token']);
            localStorage.setItem('jwt', response['token']);
            return callback && callback();
        });

    }


    isAuthenticated(): boolean {
        return this.storage.getItem('jwt') && true;
    }


}
