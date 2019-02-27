import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {
    }

    public logout() {
        this.authenticationService.logout();
    }

    public isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }

    ngOnInit(): void {
        this.authenticationService.checkAuthentication();
    }

}
