import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import {_} from "underscore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string;
  showSpinner: any;
  appObject: any;

  constructor(private authService: AuthService, private webStorageService: WebStorageService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.showSpinner = false; //hide inline spinner
      
    //setting this to true will show the loading/busy animation ie modal spinner
    this.spinnerService.changeMessage({
      showSpinner: false
    });
      
    this.webStorageService.setHomepageAppObject({
        tech : "Angular",
        version : "7"
    });
      
    this.appObject = this.webStorageService.getHomepageAppObject();
  }

}
