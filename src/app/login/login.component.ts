import {Component, OnInit} from '@angular/core';
//import * as Toast from "nativescript-toast";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import 'rxjs/Rx';

import {StorageService} from '../service/storage.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    credentials: any;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.credentials = {username: '', password: ''};
    }

    public ngOnInit() {
    }

    public login() {
        this.authenticationService.authenticate(this.credentials, () => {
            //     Toast.makeText('authenticated').show();
            this.authenticationService.checkAuthentication();
        });
        //      Toast.makeText(error.json().message).show();
        return false;

    }

}
