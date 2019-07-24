import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './services/api/api.service';
import { WebStorageService } from './services/web-storage/web-storage.service';
import { NotificationMessageService } from './services/notification-message/notification-message.service';
import {SpinnerService } from './services/spinner/spinner.service';
import{ AuthService } from './authentication/auth.service';
import{ AuthGuard } from './authentication/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    NavbarComponent,
    NotificationMessageComponent,
	SpinnerComponent
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
    WebStorageService,
    NotificationMessageService,
	SpinnerService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
