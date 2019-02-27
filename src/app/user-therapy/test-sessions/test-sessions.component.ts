import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {TestSession} from '../test-session';

import {UserService} from '../user.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-details',
    templateUrl: './test-sessions.component.html',
})
export class TestSessionsComponent implements OnInit {
    testSessions: TestSession[];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params['id'];
        this.userService.byTherapyId(id).subscribe(data => {
            this.testSessions = data;
        });

    }

    public logout() {
        this.authenticationService.logout();
    }
}
