import {Component, OnInit} from '@angular/core';
import {UserService} from "~/app/user-therapy/user.service";
import {User} from "~/app/user-therapy/model";
import {fromBase64} from "tns-core-modules/image-source";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.userService.getMe().subscribe(u => {
            console.log("user details are = ");
            console.log(u);
            this.user = u;
            this.user.imageSource = 'data:image/png;base64,' + this.user.base64;

        });
    }


    map() {
        this.router.navigate(['/map']);
    }


}
