import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private subject  = new BehaviorSubject<any>('');
  data = this.subject.asObservable();

  constructor() { }

  changeMessage(data: any) {
    this.subject.next(data);
  }
}
