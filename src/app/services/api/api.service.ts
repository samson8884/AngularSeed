import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getSampleData() : Observable<any> {  
    var results = this.http.get('/api/getdata');
    
	/* Uncomment this to use mock data */
    //var results = this.http.get('/assets/mockdata/sampledata.json');
    
    /* Uncomment this to use mock data from remote server. You may need to use CORS handling */
    //var results = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    return results;
  }

}
