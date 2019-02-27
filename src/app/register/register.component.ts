import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from '../service/authentication.service';

@Component({
    selector: 'ns-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent {

    public input: any;

    public constructor(private location: Location, private authService: AuthenticationService) {
        this.input = {
            username: '',
            name: '',
            email: '',
            password: ''
        };
    }

    public register() {
        if (this.input.username && this.input.name && this.input.email && this.input.password) {
            this.authService.create(this.input, () => {
                //     Toast.makeText('authenticated').show();
                // this.authenticationService.checkAuthentication();
                this.location.back();
            });
            // this.storageService.setItem('account', JSON.stringify(this.input));
        } else {
            // Toast (new SnackBar()).simple("All Fields Required!");
        }
    }

    public goBack() {
        this.location.back();
    }

}
