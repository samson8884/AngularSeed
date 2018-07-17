import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private ApiService: ApiService) {
    this.initApp();
  }

  initApp() {
    this.ApiService.getSampleData().subscribe(
      data => {
        console.log('success block')
        console.log(data);
      },
      err => {
        console.log('error')
        console.error(err)
      }
    );
  }
}
