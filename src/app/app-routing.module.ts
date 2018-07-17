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
