import {Component, OnInit} from '@angular/core';

import {isPatient, Therapy} from '../model';
import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-therapies',
    templateUrl: './therapies.component.html',
})
export class TherapiesComponent implements OnInit {
    ongoingTherapies: Therapy[];
    historicalTherapies: Therapy[];

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.userService.getMe().subscribe(u => {
                if (isPatient(u)) {
                    this.userService.getOngoingTherapiesForPatient(u.username).subscribe(data => {
                        console.log(data);
                        this.ongoingTherapies = data;
                    });
                    this.userService.getHistoricalTherapiesForPatient(u.username).subscribe(data => {
                        console.log(data);
                        this.historicalTherapies = data;
                    });
                } else {
                    this.userService.getOngoingTherapiesForMed(u.username).subscribe(data => {
                        console.log(data);
                        this.ongoingTherapies = data;
                    });
                    this.userService.getHistoricalTherapiesForMed(u.username).subscribe(data => {
                        console.log(data);
                        this.historicalTherapies = data;
                    });
                }
            }
        );

    }

    public logout() {
        this.authenticationService.logout();
    }


}
