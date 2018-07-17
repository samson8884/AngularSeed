import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getSampleData() : Observable<any> {  
    console.log("in getSampleData"); 
    var results = this.http.get('/api/getdata');
    //var results = this.http.get('/assets/mockdata/sampledata.json');
    //var results = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    return results;
  }

}
