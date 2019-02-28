import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';
import {LocationService} from '../service/geo-location/location.service';
import {ToastService} from '../service/messaging/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent {

    public input: any;

    constructor(private location: Location, private authService: AuthenticationService, private geoLocationService: LocationService,
                private toast: ToastService) {
        this.input = {
            username: '',
            name: '',
            email: '',
            password: '',
            latitude: 0,
            longitude: 0
        };
    }

    private signup() {
        if (this.input.username && this.input.name && this.input.email && this.input.password) {
            this.authService.create(this.input, () => {
                this.toast.showSuccess('User successfully registered', 'Registration successful');
                this.authService.checkAuthentication();
            });
        } else {
            this.toast.showError('Please register again with correct data..', 'Registration unsuccessful');
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
