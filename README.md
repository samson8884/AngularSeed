# AngularSeedApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Running the app
Note: We need angular cli version 1.7.4 to run this app. You can install angular cli globally using
`npm install -g @angular/cli@1.7.4`
or locally using
`npm install --save @angular/cli@1.7.4`


1. Run `npm install` to install all dependencies. This is a one time install.

2. Run `npm start` for a dev server. This starts the UI and Express API server (proxy server). Navigate to `http://localhost:3333/`. The app will automatically reload if you change any of the source files.

3. Login using any string that looks like a valid email id and any string as password. The UI side validation only checks if email and password are non empty and that the email looks like a valid email id. You will need to implement backend authentication as per business needs for your project.

4. After login you should be able to access the home page and the about page.

5. Now you can start modifying the home page and about page according to your needs. These pages have been added as placeholders and you are free to modify/delete them.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



## Steps to create an Angular app
For your reference, all the steps executed to create this project have been documented below. These steps are only for reference and you do not need to perform any of these in order to run the app. If you want to run the app please refer to "Running the app" above.

1. Install angular cli
`npm install -g @angular/cli`

2. `ng new AngularSeedApp`

3. `ng serve`

4. index.html -> main.ts -> app.module.ts -> app.component.ts -> app.component.html



## Adding Express
https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli

1. `npm install --save express body-parser`

2. create server.js

3. create server/routes/api.js

https://stackoverflow.com/questions/42895585/hooking-up-express-js-with-angular-cli-in-dev-environment
The proper way is to run Angular and Express as two different apps on two different ports. Angular will be served on port 4200 and Express on port 3000 as usual.

4. Then configure a proxy for API calls to Express app. create proxy.config.json in app root
```
{
	"/api/*":{
	  "target":"http://localhost:3000",
	  "secure":false,
	  "logLevel":"debug"
	}
}
```

5. run the node js server `node server.js`
node will be available at localhost:3000

6. run the angular UI
`ng serve` -> UI will be available at localhost:4200
OR
`npm start` -> UI will be available at  localhost:4200
Depending on what start script does, npm start builds the angular app too. Check package.json.. it runs ng serve which would build the angular app
```
	"scripts": { "start": "ng serve"}
```	
	
	
## Using mock data
In cases where the API is not yet ready, we can use mock JSON data or sample JSON. Modify src/app/services/api.service.ts and comment out the code which gets data from the actual backend API. Uncomment the code to read the data from a local JSON file instead. Make sure you update the data in /assets/mockdata/sampledata.json.



## Using concurrently to start and monitor both node as well as angular
https://stackoverflow.com/questions/42895585/hooking-up-express-js-with-angular-cli-in-dev-environment

1. `npm install concurrently --save` 
   `npm install nodemon --save`

2. in package.json
```
"start": "concurrently \"npm run serve-api\" \"npm run serve\"",
"serve": "ng serve --port 3333 --proxy-config proxy.config.json", // You could add --port for changing port
"serve-api": "nodemon [YOUR_EXPRESS_APP.js] --watch server",
```

3. `npm start` is enough for running the project.



## Creating service to retrieve data
1. from root of the app
D:\SamplePrj\Angular\AngularSeedApp>ng generate service services\api\api

2. in api.service.ts
```
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
```

3. in app.module.ts
```
import { HttpClientModule } from '@angular/common/http';

imports: [
    BrowserModule,
    HttpClientModule
  ]
 ```

  

## CORS 
CORS handling should not be needed since Angular UI and Node Proxy server are running from the same host. If the Angular UI makes API requests directly, we need to handle CORS on the server side. If the server is a NodeJS server, here are the steps to handle CORS

1. `npm install cors --save`

2. in server.js
```
const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
var app = express();
app.use(cors(corsOptions)); //corsOptions is optional
```



## Creating HTTPS server
I) Usually we just need to start the UI on https
https://brianflove.com/2016/10/22/angular-cli-using-https/
1. run the UI server using
`ng serve --ssl`
you can pass the certificate & pvt key in the above command, but by default angular cli will generate its own certificate & pvt key

if you are using concurrently as descirbed above, you will need to update package.json's serve script

more here: https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

II) If we also want the node backend to start on https
https://blog.didierstevens.com/2008/12/30/howto-make-your-own-cert-with-openssl/
1. Generate SSL certificates using http://www.selfsignedcertificate.com/

2. store app.key and app.cert at approot/keys (i.e. AngularSeedApp/keys... server.js is located in AngularSeedApp)

3. in server.js
```
var   fs = require("fs"),
      https = require("https");

var privateKey  = fs.readFileSync('./keys/app.key', 'utf8');
var certificate = fs.readFileSync('./keys/app.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};	  
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443, () => console.log(`HTTPS API running on localhost:${8443}`));
```

4. `ng build`
need this step to generate the dist folder and corresponding files

5. access the app at https://localhost:8443	

Note: If you are using a proxy for Express as described in the Express section above, you will need to update proxy.config.json
```
"target":"https://localhost:8443"
```



## Font Awesome
1. `npm install @fortawesome/fontawesome-free --save`

2. add the reference to fontawesomein .angular-cli.json
```
"styles": [        
        "../node_modules/@fortawesome/fontawesome-free/css/all.min.css",
		"styles.css"
      ]
```


## Bootstrap
1. `npm install bootstrap@4.0.0 --save`
this version worked with angular 5

2. add the reference to bootstrap.css in .angular-cli.json
```
"styles": [        
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/@fortawesome/fontawesome-free/css/all.min.css",
		"styles.css"
      ]
```
	  
we could also import it in styles.css since this is already included in .angular-cli.json
```
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
```

to add the javascript component ir ngb module, use NgbModule bootstrap NOT bootstrap.min.js since this needs jQuery.
https://www.c-sharpcorner.com/article/getting-started-with-ng-bootstrap-in-angular-5-app/
D:\SamplePrj\Angular\AngularSeed\AngularSeedApp>npm install --save @ng-bootstrap/ng-bootstrap@1.1.2	

for widgets refer to
https://ng-bootstrap.github.io/#/components/tooltip/examples 



## Adding Routing
https://coursetro.com/posts/code/111/Using-the-Angular-5-Router-%28Tutorial%29
1. create app-routing.module.ts in /src/app

2. add content
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
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
```

3. in app.component.html add nav links and router outlet
```
<ul>
  <li [routerLinkActive]="['active']"><a routerLink="home">Home</a></li>
  <li [routerLinkActive]="['active']"><a routerLink="about">About</a></li>
</ul>

<router-outlet></router-outlet>
```



## Authentication With Route Guards
https://dzone.com/articles/implementing-guard-in-angular-5-app

1. `ng generate guard authentication/auth`

2. c:\AngularSeedApp\src\app\components>`ng generate component login`

3. in app-routing.module.ts 
add route for login
add canActivate for other routes
```
{
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] 
}
```
  
4. D:\SamplePrj\Angular\AngularSeed\AngularSeedApp>ng generate service authentication\auth 
Do not forget to add AuthService and AuthGuard as providers in app.module.ts.

5. use `ngNativeValidate` directive on the login form in order to support HTML5 validations



## Adding UI router
docs: https://ui-router.github.io/ng2/docs/1.1.0/modules/transition.html

1. `npm install @uirouter/angular --save`

2. create app-routing.module.ts in /src/app

3. add content
```
import { NgModule } from '@angular/core';
import { RootModule, UIRouterModule } from '@uirouter/angular';

const rootModule: RootModule = {
  states: [{
          name : "home",
          url : "/home",
          component : HomeComponent
      }],
  useHash: false,
  otherwise: "/home"
};

@NgModule({
  imports: [UIRouterModule.forRoot(rootModule)],
  exports: [UIRouterModule]
})
export class AppRoutingModule { }
```

4. Next step is to modify the app.component.html in /src/app, change:
```
<router-outlet></router-outlet>
```

into:
```
<ui-view></ui-view>
```

5. in app.module.ts
```
import { AppRoutingModule } from './app-routing.module';
```

and add AppRoutingModule to imports array

6. create components
c:\AngularSeedApp\src\app\components>ng generate component home

7. access that app at http://localhost:3333/home. If useHash is true, the URL will be http://localhost:3333/#/home


Note: If you find issues with ui router, the version of ui router may not be compatible with your angular version. For example "@uirouter/angular": "^2.0.0", did not work with "@angular/core": "^5.2.0". I had to downgrade to "@uirouter/angular": "^1.1.0"


## Themes
In order to customize the colours and look of the app, you can edit theme.scss. You could also replace this file with you own theme file. Remeber to add the theme css/scss file at the end of the styles in .angular-cli.json



## useful npm commands
```
1. npm view @uirouter/angular versions (this lists all versions of ui router)
2. npm uninstall --save @uirouter/angular
3. npm install --save @uirouter/angular@^1.1.0
```

