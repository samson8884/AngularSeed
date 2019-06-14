import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import {_} from "underscore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string;
  showSpinner: boolean;
  appObject: any;

  constructor(private authService: AuthService, private webStorageService: WebStorageService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    
    //setting this to true will show the loading/busy animation
    this.showSpinner = false;
      
    this.webStorageService.setHomepageAppObject({
        tech : "Angular",
        version : "7"
    });
      
    this.appObject = this.webStorageService.getHomepageAppObject();
  }

}
