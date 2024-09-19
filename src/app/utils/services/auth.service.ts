import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../types/user.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  user: Partial<User> = {
    email: '',
    admin: false
  }

  userChange$: BehaviorSubject<Partial<User>> = new BehaviorSubject(this.user)

  constructor(private http: HttpClient) {
    this.userChange$.subscribe(change => this.user = change);
  }

  register(user: Partial<User>): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: Pick<User, 'email' | 'password'>): Observable<boolean> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('token', response.email);
          localStorage.setItem('isAdmin', JSON.stringify(response.admin));
          this.userChange$.next(response)
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  getUserInfo(): void {
    this.userChange$.next({
      admin: localStorage.getItem('isAdmin') === 'true',
      email: localStorage.getItem('token') ?? ''
    });
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.userChange$.next({
      email: '',
      admin: false
    })
  }

  private handleError(error: any) {
    console.error('Une erreur s\'est produite', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
