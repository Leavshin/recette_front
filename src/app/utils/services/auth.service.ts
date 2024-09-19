import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../types/user.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAdmin(): boolean {
    let isAdmin: boolean = JSON.parse(<string>localStorage.getItem('isAdmin'));
    return isAdmin;
  }

  private handleError(error: any) {
    console.error('Une erreur s\'est produite', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
