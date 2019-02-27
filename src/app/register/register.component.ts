import { Component } from "@angular/core";
import { Location } from "@angular/common";
import {StorageService} from "../service/storage.service";

@Component({
  selector: "ns-register",
  templateUrl: "register.component.html",
})
export class RegisterComponent {

  public input: any;

  public constructor(private location: Location, private storageService: StorageService) {
    this.input = {
      "username": "",
      "email": "",
      "password": ""
    }
  }

  public register() {
    if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
      this.storageService.setItem('account', JSON.stringify(this.input));
      this.location.back();
    } else {
     // Toast (new SnackBar()).simple("All Fields Required!");
    }
  }

  public goBack() {
    this.location.back();
  }

}