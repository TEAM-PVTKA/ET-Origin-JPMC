import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { CardDetails } from '../cards/cards.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

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

  getCardsForUser(username: string): Observable<CardDetails[]> {
    return this.http.get<CardDetails[]>(
      `http://localhost:4300/users/cards/${username}`
    );
  }

  // private baseUrl = 'http://localhost:4300/users';
  // getCardsForUser(username: any): Observable<any> {
  //   const url = `${this.baseUrl}/uniqueCardHolders?userName=${username}`;
  //   return this.http.get<CardDetails[]>(url).pipe(
  //     tap((data) => console.log('Fetched cards:', data)),
  //     catchError((error) => {
  //       console.error('Error fetching cards:', error);
  //       throw error;
  //     })
  //   );
  // }
}
