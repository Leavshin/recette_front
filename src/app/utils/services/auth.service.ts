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
    id: -1,
    email: '',
    admin: false
  }

  userChange$: BehaviorSubject<Partial<User>>;

  constructor(private http: HttpClient) {
    let userStorage = localStorage.getItem('user');
    if (userStorage) {
      this.user = JSON.parse(userStorage);
    }
    this.userChange$ = new BehaviorSubject(this.user);
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
          this.user = {
            id: response.id,
            email: response.email,
            admin: response.admin
          }
          localStorage.setItem('user', JSON.stringify(this.user));
          this.userChange$.next(this.user)
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  getUserInfo(): void {
    this.userChange$.next(this.user);
  }


  logout(): void {
    localStorage.removeItem('user');
    this.userChange$.next({
      id: -1,
      email: '',
      admin: false
    })
  }

  private handleError(error: any) {
    console.error('Une erreur s\'est produite', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
