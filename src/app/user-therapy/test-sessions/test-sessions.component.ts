import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Duration, TestSession, User} from '../model';

import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {ValueList} from 'nativescript-drop-down';
import {DatePicker} from 'tns-core-modules/ui/date-picker';
import {TimePicker} from 'tns-core-modules/ui/time-picker';
import {StorageService} from '../../service/storage.service';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import {ToastService} from '../../service/messaging/toast.service';

@Component({
    selector: 'app-details',
    templateUrl: './test-sessions.component.html',
})
export class TestSessionsComponent implements OnInit {
    requestedSessions: TestSession[];
    ongoingSessions: TestSession[];
    historicalSessions: TestSession[];
    med: User;

    public therapyId;

    requestedHours: any;


    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private storage: StorageService,
        private toast: ToastService
    ) {
    }

    ngOnInit(): void {
        this.therapyId = +this.route.snapshot.params['id'];
        this.userService.getRequestedSessions(this.therapyId).subscribe(data => {
            this.requestedSessions = data;
            if (this.med === null) {
                this.med = this.requestedSessions.pop().therapy.med;
            }
        });
        this.userService.getOngoingSessions(this.therapyId).subscribe(data => {
            this.ongoingSessions = data;
            if (this.med === null) {
                this.med = this.ongoingSessions.pop().therapy.med;
            }
        });
        this.userService.getHistoricalSessions(this.therapyId).subscribe(data => {
            this.historicalSessions = data;
            if (this.med === null) {
                this.med = this.historicalSessions.pop().therapy.med;
            }
        });

    }


    public shouldAddSession() {
        return this.isMed() && !this.hasUpcomingSessions() && !this.hasRequestedSessions();
    }

    public isMed() {
        return this.storage.getItem('patient') === 'false';
    }

    public logout() {
        this.authenticationService.logout();
    }

    public requestSession() {
        dialogs.action({
            message: 'Request session hours',
            cancelButtonText: 'Cancel',
            actions: ['1', '2', '3', '4']
        }).then(result => {
            this.requestedHours = result;
            this.userService.requestSession(this.therapyId, this.requestedHours)
                .subscribe(() => this.toast.showSuccess('Session request successfully created', 'Request session'));
        });
    }


    private hasRequestedSessions() {
        return this.requestedSessions && this.requestedSessions.length > 0;
    }

    private hasUpcomingSessions() {
        return this.ongoingSessions && this.ongoingSessions.length > 0;
    }


}
