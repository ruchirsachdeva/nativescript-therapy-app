import {Component, OnInit} from '@angular/core';

import {Player, Therapy} from '../player';
import {PlayerService} from '../player.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {
    therapies: Therapy[];

    constructor(private playerService: PlayerService, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.playerService.getTherapies().subscribe(data => {
            console.log(data);
            this.therapies = data;
        });
    }

    public logout() {
        this.authenticationService.logout();
    }


}
