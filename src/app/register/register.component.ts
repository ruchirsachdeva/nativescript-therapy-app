import {Component, ElementRef, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';
import {LocationService} from '../service/geo-location/location.service';
import {ToastService} from '../service/messaging/toast.service';
import {SelectedIndexChangedEventData, ValueList} from 'nativescript-drop-down';
import {ObservableArray, ChangedData} from 'tns-core-modules/data/observable-array';
import {Switch} from 'tns-core-modules/ui/switch';

import * as camera from 'nativescript-camera';
import * as imageModule from 'tns-core-modules/ui/image';
import {fromAsset, fromBase64, ImageSource} from 'tns-core-modules/image-source';
@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent {

    public input: any;
    public items: ValueList<string> = new ValueList<string>();

    constructor(private location: Location, private authService: AuthenticationService, private geoLocationService: LocationService,
                private toast: ToastService) {
        this.input = {
            username: '',
            name: '',
            email: '',
            password: '',
            latitude: 0,
            longitude: 0,
            roleName: 'PATIENT',
            selectedIndex: 1,
            organizationId: null,
            base64: null,
            imageSource: ''
        };

        this.authService.getOrganizations().subscribe(data => {
            data.forEach(o =>
                this.items.push({value: '' + o.organizationId, display: o.name}));
        });

        // set the index programatically from the parent component
        //    this.dropDown.nativeElement.selectedIndex = 2;
    }

    public onFirstChecked(args) {
        const firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.input.roleName = 'PATIENT';
        } else {
            this.input.roleName = 'PHYSICIAN';
        }
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }

    public onopen() {
        console.log('Drop Down opened.');
    }

    public onclose() {
        console.log('Drop Down closed.');
    }

    private signup() {
        console.log('roleName = ' + this.input.roleName);
        this.input.organizationId = this.items.getValue(this.input.selectedIndex);
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

    public photo() {
        this.photoPromise().then(res => {
            this.publish(res);
        });
    }

    private publish(base64) {
        console.log('base64');
        console.log(base64);
        this.input.base64 = base64;
        this.input.imageSource = 'data:image/png;base64,'+base64;
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


    public goBack() {
        this.location.back();
    }

}
