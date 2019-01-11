import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import {_} from "underscore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  showSpinner: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getToken().split("@")[0];
    
    //setting this to true will show the loading/busy animation
    this.showSpinner = false;
  }

}
