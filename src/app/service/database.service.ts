import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:4300/users/register', user, {
      responseType: 'text',
    });
  }

  login(details: any): Observable<any> {
    return this.http.post('http://localhost:4300/users/login', details);
  }

  cards(details: any): Observable<any> {
    return this.http.post('http://localhost:4300/users/cards', details);
  }

  // getcards(details:any): Observable<any>{
  //   return this.http.get('http://localhost:4300/users/addcards', details)
  // }

  getCardsForUser(userName: any): Observable<any> {
    return this.http.get('http://localhost:4300/users/addcards', userName);
  }

}
