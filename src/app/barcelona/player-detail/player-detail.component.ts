import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Player} from '../player';
import {TestSession} from '../test-session';

import {PlayerService} from '../player.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-details',
    templateUrl: './player-detail.component.html',
})
export class PlayerDetailComponent implements OnInit {
    player: Player;

    testSessionsAsMed: TestSession[];
    testSessionsAsPatient: TestSession[];

    constructor(
        private playerService: PlayerService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params['id'];
        this.playerService.getPlayer(id).subscribe(data => {
            this.player = data;
        });

        this.playerService.getTestSessionsByMedId(id).subscribe(data => {
            this.testSessionsAsMed = data;
        });

        this.playerService.getTestSessionsByPatientId(id).subscribe(data => {
            this.testSessionsAsPatient = data;
        });

    }

    public logout() {
        this.authenticationService.logout();
    }
}
