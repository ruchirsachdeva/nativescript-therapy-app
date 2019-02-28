import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {ToastService} from './service/messaging/toast.service';
import {LocationService} from './service/geo-location/location.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ToastService, LocationService],  // shared services for web and native

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
