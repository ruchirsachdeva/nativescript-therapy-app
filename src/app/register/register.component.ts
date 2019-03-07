import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';
import {LocationService} from '../service/geo-location/location.service';
import {ToastService} from '../service/messaging/toast.service';
import * as camera from 'nativescript-camera';
import * as imageModule from 'tns-core-modules/ui/image';
import {File} from 'tns-core-modules/file-system';
import {UserService} from '../user-therapy/user.service';
import {fromAsset} from 'tns-core-modules/image-source';


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent {

    public input: any;
    private base64: any;

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

    private publish() {
        console.log('this.base64');
        console.log(this.base64);
        this.authService.media({
            data: this.base64,
            status: ''
        });
    }

    public photo() {
        this.photoPromise().then(res => {
            this.base64 = res;
            console.log(this.base64);
        });
    }


    private photoPromise() {
        const options = {width: 100, height: 100, keepAspectRatio: false};

        return new Promise(resolve => {
            camera.requestPermissions()
                .then(() => {
                    camera.takePicture(options)
                        .then(function (imageAsset) {
                            console.log('Result is an image asset instance');
                            const image = new imageModule.Image();
                            image.src = imageAsset;
// convert ImageAsset to ImageSource
                            fromAsset(imageAsset).then(res => {
                                const myImageSource = res;
                                resolve(myImageSource.toBase64String('jpeg', 100));
                            });

                        }).catch(function (err) {
                        console.log('Error -> ' + err.message);
                    });
                })
                .catch(e => {
                    console.log('Error requesting permission');
                });
        });
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
