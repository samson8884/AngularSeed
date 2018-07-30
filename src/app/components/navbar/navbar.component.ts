import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isUserLoggedIn(): boolean {        
    return this.authService.isLoggednIn();
  }

  logout() {
    this.authService.logout();
  }

}
