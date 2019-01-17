import { Injectable } from '@angular/core';

@Injectable()
export class WebStorageService {

  constructor() {
  }

  private getSessionObject() {
    let sessionObj = null;
    sessionObj = sessionStorage.getItem('AngularSeedApp');
    if(sessionObj) {
      sessionObj= JSON.parse(sessionObj);
    } else {
      sessionObj = {
        homePage : {
          app: {
            tech : null,
            version : null
          }
        },
        page2 : {
          object1: {
            property1 : null,
            property2 : null
          }
        }
      };
    }
    return sessionObj;
  }

  private updateSessionObject(sessionObj: any) {
    sessionStorage.setItem('AngularSeedApp', JSON.stringify(sessionObj));
  }

  public setHomepageAppObject(value) {
    let sessionObj = this.getSessionObject();
    sessionObj.homePage.app =  {
      tech : value.tech,
      version : value.version
    };
    this.updateSessionObject(sessionObj);
  }

  public getHomepageAppObject(): any {    
    return this.getSessionObject().homePage.app;
  }
}
