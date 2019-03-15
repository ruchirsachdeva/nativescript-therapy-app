import {Component, OnInit} from '@angular/core';

import {isPatient, Therapy} from '../model';
import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {StorageService} from '../../service/storage.service';

@Component({
    selector: 'app-therapies',
    templateUrl: './therapies.component.html',
})
export class TherapiesComponent implements OnInit {
    ongoingTherapies: Therapy[];
    historicalTherapies: Therapy[];

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private storage: StorageService) {
    }

    ngOnInit(): void {
        this.userService.getMe().subscribe(u => {
                const patient = isPatient(u);
                this.storage.setItem('patient', patient);
                if (patient) {
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
