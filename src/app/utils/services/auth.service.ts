import { Injectable } from '@angular/core';
import { User } from '../types/user.types'; // Assurez-vous que ce chemin est correct
import { Observable, of, throwError } from 'rxjs'; // Ajoutez ces imports

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly usersKey = 'users'; // Clé pour stocker les utilisateurs dans le localStorage

  constructor() {}

  // Méthode pour enregistrer un utilisateur (simule l'ajout dans le localStorage)
  register(user: Partial<User>): void {
    const users = this.getUsers();
    if (!users.find(u => u.email === user.email)) {
      users.push(user as User);
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    } else {
      console.error('User already exists');
    }
  }

  // Modifiez cette méthode pour retourner un Observable
  login(cred: Pick<User, 'email' | 'password'>): Observable<boolean> {
    const users = this.getUsers();
    const user = users.find(u => u.email === cred.email && u.password === cred.password);
    if (user) {
      localStorage.setItem('token', 'dummy-token');
      return of(true);
    } else {
      return throwError(() => new Error('Identifiants invalides'));
    }
  }

  // Méthode pour obtenir le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Méthode privée pour obtenir la liste des utilisateurs depuis le localStorage
  private getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  // Facultatif : Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('token'); // Supprime le token lors de la déconnexion
  }
}
