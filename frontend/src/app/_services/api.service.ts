import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'https://guides.peruzal.com/xamarin-forms-guide/files/movies.json'
  // apiURL = 'http://www.omdbapi.com/?s=movie&apikey=3ce0557b'
  constructor(
    private http: HttpClient
  ) { 
  }

  getAPIData(data?) {
    return this.http.get(this.apiURL).toPromise();
  }
}
