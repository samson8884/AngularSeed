/* For angular Router 
*
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import{ AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard] 
  },{
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* For UI Router 
*
*/
/*
import { NgModule } from '@angular/core';
import { RootModule, UIRouterModule } from '@uirouter/angular';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const rootModule: RootModule = {
  states: [
      {
          name : "home",
          url : "/home",
          component : HomeComponent
      }, {
        name : "about",
        url : "/about",
        component : AboutComponent
    }      
  ],
  useHash: false,
  otherwise: "/home "
};

@NgModule({
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class AppRoutingModule { }
*/
