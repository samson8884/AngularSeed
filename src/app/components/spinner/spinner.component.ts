import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner: boolean;

  constructor(private SpinnerService: SpinnerService) { }

  ngOnInit() {    
    this.showSpinner = false;
    this.SpinnerService.data.subscribe(data => {
      if(data) {
        this.showSpinner = data.showSpinner;
      }
    });        
  }

}

