import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { NotificationMessageService } from './services/notification-message/notification-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  notificationMessageSubscriber;

  constructor(private ApiService: ApiService, private NotificationMessageService: NotificationMessageService) {
    this.initApp();
  }

  initApp() {
    this.ApiService.getSampleData().subscribe(
      data => {
        console.log('success block')
        console.log(data);
      },
      err => {
        this.displayError(err);
      }
    );
  }

  ngOnDestroy() {
    this.notificationMessageSubscriber && this.notificationMessageSubscriber.unsubscribe();
  }
    
  displayError(err) {
    this.notificationMessageSubscriber = this.NotificationMessageService.changeMessage({
      message : 'Could not fetch data. ' + err.message, type : 'ERROR'});
      console.log('error in getSampleData');
      console.log(err);    
  }
}
