import {Component, OnInit} from '@angular/core';

import { Therapy} from '../player';
import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-therapies',
    templateUrl: './therapies.component.html',
})
export class TherapiesComponent implements OnInit {
    therapies: Therapy[];

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.userService.getTherapies().subscribe(data => {
            console.log(data);
            this.therapies = data;
        });
    }

    public logout() {
        this.authenticationService.logout();
    }


}
