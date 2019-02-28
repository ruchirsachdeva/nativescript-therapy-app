import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ToastService} from '../service/messaging/toast.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    credentials: any;

    constructor(private authenticationService: AuthenticationService, private toast: ToastService) {
        this.credentials = {username: '', password: ''};
    }

    public ngOnInit() {
    }

    public login() {
        this.authenticationService.authenticate(this.credentials, () => {
                this.toast.showSuccess('User successfully authenticated', 'Login successful');
                this.authenticationService.checkAuthentication();
                return true;
            },
            () => {
                this.toast.showError('Please try again..', 'Login unsuccessful');
                return false;
            }
        );
    }

}
