import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Duration, TestSession, User} from '../model';

import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {ValueList} from 'nativescript-drop-down';

@Component({
    selector: 'app-details',
    templateUrl: './test-sessions.component.html',
})
export class TestSessionsComponent implements OnInit {
    requestedSessions: TestSession[];
    ongoingSessions: TestSession[];
    historicalSessions: TestSession[];
    med: User;

    public availableHours: Array<Duration>;
    public selectedIndex: 1;


    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params['id'];
        this.userService.getRequestedSessions(id).subscribe(data => {
            this.requestedSessions = data;
            if (this.med === null) {
                this.med = this.requestedSessions.pop().therapy.med;
            }
        });
        this.userService.getOngoingSessions(id).subscribe(data => {
            this.ongoingSessions = data;
            if (this.med === null) {
                this.med = this.ongoingSessions.pop().therapy.med;
            }
        });
        this.userService.getHistoricalSessions(id).subscribe(data => {
            this.historicalSessions = data;
            if (this.med === null) {
                this.med = this.historicalSessions.pop().therapy.med;
            }
        });

        this.userService.getAvailableHours(id).subscribe(data => {
            this.availableHours = [];
            data.forEach(duration =>
                this.availableHours.push(duration));
        });

    }

    public logout() {
        this.authenticationService.logout();
    }
}
