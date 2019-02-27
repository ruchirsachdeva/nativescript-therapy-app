import {Component, OnInit} from '@angular/core';

import {Player} from '../player';
import {PlayerService} from '../player.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {
    players: Player[];

    constructor(private playerService: PlayerService, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.playerService.getPlayers().subscribe(data => {
            console.log(data);
            this.players = data;
        });
    }

    public logout() {
        this.authenticationService.logout();
    }


}
