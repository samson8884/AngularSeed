import { Component, OnInit } from '@angular/core';
import { NotificationMessageService } from '../../services/notification-message/notification-message.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent implements OnInit {

  notificationMessage: string;
  showNotification: boolean;
  alertType: string;

  constructor(private NotificationMessageService: NotificationMessageService) { }

  ngOnInit() {
    this.alertType = 'error';
    this.showNotification = false;
    this.NotificationMessageService.data.subscribe(data => {
      if(data) {
        this.notificationMessage = data.message;
        this.alertType = data.type;
        this.showNotification = true;
      }
    });        
  }

}
