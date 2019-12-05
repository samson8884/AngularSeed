# AngularSeed App - the seed for Angular 7 web applications
Angular skeleton application designed to quick start your webapp. Developers can concentrate on building business specific requirements and forget the overheads, thus considerably reducing time and efforts. It comes fully integrated with Angular, Express, Concurrently, Bootstrap, Font Awesome and some animations.

The app comes with a login page, landing page and about page. These pages are meant to be placeholders. They have been added so that login workflow and routing can be provided straight out of the box. They have corresponding Angular based components which can be used to provide a 3 page headstart into developing your own project. Developers are expected to modify these or add more as per business needs.


## Running the app
Note: We need angular cli version 7.3.8 to run this app. You can install angular cli globally using
`npm install -g @angular/cli@7.3.8`
or locally using
`npm install --save @angular/cli@7.3.8`


1. Run `npm install` to install all dependencies. This is a one time install.

2. Run `npm start` for a dev server. This starts the UI and Express API server (proxy server). Navigate to `http://localhost:3333/`. The app will automatically reload if you change any of the source files.

3. Login using any string that looks like a valid email id and any string as password. The UI side validation only checks if email and password are non empty and that the email looks like a valid email id. You will need to implement backend authentication as per business needs for your project.

4. After login you should be able to access the home page and the about page.

5. Now you can start modifying the home page and about page according to your needs. These pages have been added as placeholders and you are free to modify/delete them.

## How to use
This section explains how to use common features

## 1) Notifications
NotificationMessageService and NotificationMessageComponent can be used to display messages in a modal. For example, you could use this to display error messages when a backend API call fails.
Check the displayError() method in app.component.ts for details.
Note: NotificationMessageComponent supports WARNING, INFO, SUCCESS and ERROR type messages.

## 2) Spinner or Busy/Loading animation
The app has a ready to use CSS based spinner. This can be used on any of your pages eg: when a REST API call is made and the UI is waiting for the backed to respond with data.

There are 2 types of spinners

1) In line spinner
This can be used on a particular section on a page

Refer to home.component.html 
```
<div class="lds-blocks" *ngIf="showSpinner"><div></div><div></div></div>
```
You need to include the spinner in the HTML file along with a condition indicating when this needs to be displayed. Set this.showSpinner = true when you need to show the in line spinner.

2) Modal spinner
This can be used to show a spinner which blurs out the entire page so the user does not click on any items when the page is loading.

Refer to home.component.ts
You could import SpinnerService and set `showSpinner` to false when the component is initialized and true when you need to show the modal spinner.

## 3) Web Storage
The WebStorageService can be used to save/retrieve data to/from web storage. Update the `sessionObj` defined in the `getSessionObject()` method and modify it according to your needs. The current example provided contains an `app` object which is used on the `Home Page`. It is advisable to design the `sessionObject` well and structure it logically (page wise according to the example provided). Refer to `home.componen.ts` on how to save data into session storage and how to retrieve it.



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.



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
`ng serve --proxy-config proxy.config.json` -> UI will be available at localhost:4200
OR
`npm start` -> UI will be available at  localhost:4200
Depending on what start script does, npm start builds the angular app too. Check package.json.. it runs ng serve which would build the angular app
```
	"scripts": { "start": "ng serve  --host 0.0.0.0 --disableHostCheck true --proxy-config proxy.config.json"}
```	
--host is passed in order to access the app on remote machines (other than localhost)
--disableHostCheck is passed in order to resolve invalid host header issues 
	
	
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
Note: (for angular version 5) Do not import HttpClientModule from @angular/common/http if you need to pass special characters as query params instead import from ngx-http-client

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

2. add the reference to fontawesomein angular.json
```
"styles": [        
        "../node_modules/@fortawesome/fontawesome-free/css/all.min.css",
		"styles/styles.css"
      ]
```


## Bootstrap
1. `npm install bootstrap@4.0.0 --save`
this version worked with angular 5

2. add the reference to bootstrap.css in angular.json
```
"styles": [        
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "../node_modules/@fortawesome/fontawesome-free/css/all.min.css",
		"styles/styles.css"
      ]
```
	  
we could also import it in styles.css since this is already included in angular.json
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

2. D:\SamplePrj\Angular\AngularSeedApp>ng generate component components\login

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
D:\SamplePrj\Angular\AngularSeedApp>ng generate component components\home

7. access that app at http://localhost:3333/home. If useHash is true, the URL will be http://localhost:3333/#/home


Note: If you find issues with ui router, the version of ui router may not be compatible with your angular version. For example "@uirouter/angular": "^2.0.0", did not work with "@angular/core": "^5.2.0". I had to downgrade to "@uirouter/angular": "^1.1.0" (this is for angular 5, we have now upgraded to angular 7 so this may not be applicable for the current code)


## Themes
In order to customize the colours and look of the app, you can edit theme.scss. You could also replace this file with you own theme file. Remeber to add the theme css/scss file at the end of the styles in angular.json


## SCSS support
SCSS makes styling easier to write, understand and maintain. We need to update angular.json and configure it to use SCSS.
Add a key @schematics/angular:component with the key styleext set to scss.
```
"schematics": {
  "@schematics/angular:component": {
    "prefix": "app",
    "styleext": "scss"
  }
 }
 ```
 
The following examples are available
1. Grouping with hierarchy - refer to login.component.scss
2. Variables and Theming - refer to _variables.scss and styles.css for highlight color
3. Mixin - refer to _mixin.scss and login.component.scss for the border-radius mixin
4. Importing file - variables and mixins can be imported into scss files which need to use them. Refer to styles.scss and login.component.scss



## useful npm commands
```
1. npm view @uirouter/angular versions (this lists all versions of ui router)
2. npm uninstall --save @uirouter/angular
3. npm install --save @uirouter/angular@^1.1.0
```

