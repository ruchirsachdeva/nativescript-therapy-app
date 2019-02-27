import {Component, OnInit} from '@angular/core';

import {Player} from '../player';
import {PlayerService} from '../player.service';
import {StorageService} from "../../service/storage.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
})
export class PlayersComponent implements OnInit {
    players: Player[];

    constructor(private playerService: PlayerService, private storageService: StorageService,private router:Router,
                private loginService:LoginService) {
    }

    ngOnInit(): void {
        this.playerService.getPlayers().subscribe(data => {
            if(!this.loginService.isAuthenticated()) {
                this.router.navigate(["/login"]);
            }
            console.log(data);
            this.players = data;
        });
    }

    public logout() {
        this.storageService.removeItem('jwt');
        this.router.navigate(["/login"]);
    }
}
