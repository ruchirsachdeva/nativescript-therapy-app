import {Component} from "@angular/core";
//import * as Toast from "nativescript-toast";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

import "rxjs/Rx";

import { StorageService } from '../service/storage.service';

@Component({
    selector: "login",
    templateUrl: './login.component.html',
})
export class LoginComponent {
    credentials = {username: '', password: ''};

    constructor(private storage: StorageService, private http: HttpClient, private router: Router) {
    }

    public login() {
        const headerss = new HttpHeaders(this.credentials ? {
               'content-type': 'application/json'
            } : {
                authorization: 'Bearer ' + this.storage.getItem('jwt'),
                'content-type': 'application/json'
            });

        const httpOptions = {
            headers: headerss
        };
        this.http.post("https://pd-social-server.herokuapp.com/api/auth", JSON.stringify({
            username: this.credentials.username,
            password: this.credentials.password
        }), httpOptions)
            .subscribe(result => {
                //     Toast.makeText('authenticated').show();
                console.log('auth response.....');
                console.log(result['token']);
                this.storage.setItem('jwt', result['token']);
                this.router.navigate(["authenticated"], {queryParams: {jwt: result['token']}});
            }, error => {
                //      Toast.makeText(error.json().message).show();
            });
    }

}