import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';
import {LocationService} from '../service/geo-location/location.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    providers: [LocationService]
})
export class RegisterComponent {

    public input: any;

    constructor(private location: Location, private authService: AuthenticationService, private geoLocationService: LocationService) {
        this.input = {
            username: '',
            name: '',
            email: '',
            password: '',
            latitude: 0,
            longitude: 0
        };
        this.register();
    }

    private signup() {
        if (this.input.username && this.input.name && this.input.email && this.input.password) {
            this.authService.create(this.input, () => {
                //     Toast.makeText('authenticated').show();
                // this.authenticationService.checkAuthentication();
                this.authService.checkAuthentication();
            });
        } else {
            // Toast (new SnackBar()).simple("All Fields Required!");
        }
    }

    public register() {
        this.geoLocationService.getGeoLocation().then(loc => {
            if (loc) {
                console.log('Current location is: ' + loc.latitude + ',' + loc.longitude);
                this.input.latitude = loc.latitude;
                this.input.longitude = loc.longitude;
            }
            this.signup();
        }, function (e) {
            this.signup();
            console.log('Error: ' + e.message);
        });
    }


    public goBack() {
        this.location.back();
    }

}
