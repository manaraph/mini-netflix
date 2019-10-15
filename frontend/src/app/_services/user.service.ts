import { Injectable } from '@angular/core';
import { IUser } from '../_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: IUser) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('/api/register', user, options);
  }
}
