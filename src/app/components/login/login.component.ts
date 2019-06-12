import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../authentication/auth.service';

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']

})

export class LoginComponent implements OnInit {

  form: any;
  emailTxt: string;
  passwordTxt: string;

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
    if(this.auth.isLoggednIn()) {
      this.myRoute.navigate(["home"]);
    }
  }

  login() {
    console.log(this.emailTxt)
    this.auth.sendToken(this.emailTxt)
    this.myRoute.navigate(["home"]);
    // if (this.form.valid) {
    //   this.auth.sendToken(this.form.value.email)
    //   this.myRoute.navigate(["home"]);
    // }

  }  

}