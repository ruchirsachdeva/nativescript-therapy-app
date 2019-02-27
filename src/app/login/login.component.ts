import {Component, OnInit} from "@angular/core";
//import * as Toast from "nativescript-toast";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

import "rxjs/Rx";

import {StorageService} from '../service/storage.service';
import {LoginService} from "../service/login.service";

@Component({
    selector: "login",
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    credentials: any;

    constructor(private loginService: LoginService, private router: Router) {
        this.credentials = {username: '', password: ''};
    }

    public ngOnInit() {
        if(this.loginService.isAuthenticated()) {
            this.router.navigate(["authenticated"]);
        }
    }

    public login() {
        this.loginService.authenticate(this.credentials, () => {
            //     Toast.makeText('authenticated').show();
            this.router.navigate(["authenticated"]);
        });
        //      Toast.makeText(error.json().message).show();
        return false;

    }

}