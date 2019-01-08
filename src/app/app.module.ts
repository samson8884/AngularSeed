import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from 'ngx-http-client';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './services/api/api.service';
import { NotificationMessageService } from './services/notification-message/notification-message.service';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

import{ AuthGuard } from './authentication/auth.guard';
import{ AuthService } from './authentication/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    NavbarComponent,
    NotificationMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiService,
    NotificationMessageService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
